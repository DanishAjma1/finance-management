import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDb";
import Card from "../../models/cards";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


const getUserID = (req) => {
  const cookies = req.headers.get("cookie");
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
  try {
    const body = await req.json();
    await connectMongoDB();
    const userId = getUserID(req);

    const saveCard = await Card.create({
      ...body,
      user_id: userId,
    });

    return new Response(JSON.stringify({ saveCard }), { status: 201 });
  } catch (error) {
    console.error("Error creating card:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const userId = getUserID(req);
    const cards = await Card.find({ user_id: userId });
    return NextResponse.json({ cards }, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ message: "Id not found" }), { status: 400 });
    }
    const body = req.json();
    await connectMongoDB();

    const res = await Card.updateOne({ _id: new Object(id) }, { $set: body });
    return new Response(JSON.stringify({ message: "Updated Successfully.." }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

export async function DELETE(req) {
  try{
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id");
  await connectMongoDB();
  await Card.deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({message: "Card Deleted.."}),{status:200})
  }
  catch(error){
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
