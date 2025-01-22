import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDb";
import bankAccounts from "../../models/bankAccounts";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { name, description, balance,acc_num } = await req.json();

    await connectMongoDB();
    const userId = getUserID(req);
    const saveAccount = await bankAccounts.create({
      name,
      description,
      balance,
      acc_num,
      user_id: userId,
    });
    return new Response(JSON.stringify({ saveAccount }), { status: 201 });
  } catch (error) {
    return new Response({ error }, { status: 500 });
  }
}
const getUserID = (req) => {
  const cookies = req.headers.get("Cookie");

  if (!cookies) {
    throw new Error("Unauthorized cookie");
  }

  const authToken = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("auth_token="))
    ?.split("=")[1];

  if (!authToken) {
    throw new Error("Token not found");
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      throw new Error("Invalid token");
    }

    return decoded.id;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

export async function GET(req) {
  try {
    await connectMongoDB();
    const userId = getUserID(req);
    const bankAccount = await bankAccounts.find({ user_id: userId });
    return NextResponse.json({ bankAccount }, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400,
      });
    }

    const body = await req.json();

    await connectMongoDB();
    const res = await bankAccounts.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );
    return new Response(JSON.stringify({ message: "Updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response({ message: "something went wrong.." }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400,
      });
    }
    await connectMongoDB();
    await bankAccounts.deleteOne({ _id: new ObjectId(id) });

    return new Response(
      JSON.stringify({ message: "Account deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during deletion:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
