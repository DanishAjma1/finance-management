import Transaction from "../../models/transactions";
import connectMongoDB from "../../lib/mongoDb";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

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

export async function POST(req) {
  const { description, acc_num, amount, date } = await req.json();
  try {
    await connectMongoDB();
    const userId = getUserID(req);
    if (!userId) {
      return new Response({ message: "User id required.." }, { status: 400 });
    }
    await Transaction.create({
      description,
      amount,
      acc_num,
      date,
      user_id: userId,
    });
    return new Response(
      { message: "Data inserted successfully.." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response({ error }, { status: 500 });
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
    await Transaction.deleteOne({ _id: new ObjectId(id) });

    return new Response(
      JSON.stringify({ message: "Transaction deleted successfully" }),
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

export async function GET(req) {
  try {
    await connectMongoDB();
    const userId = getUserID(req);
    console.log(userId);
    const transaction = await Transaction.find({ user_id: userId });
    return new Response(
      JSON.stringify({ message: "Transaction deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
