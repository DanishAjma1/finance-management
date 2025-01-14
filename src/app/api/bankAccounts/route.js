import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDb";
import bankAccounts from "../../models/bankAccounts";
import { stat } from "fs";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectMongoDB();
    await bankAccounts.create(body);
    return new Response(
      JSON.stringify({ message: "Data added successfully.." }),
      { status: 201 }
    );
  } catch (error) {
    return new Response({ message: "something went wrong.." }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const bankAccount = await bankAccounts.find();
    return NextResponse.json({ bankAccount }, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

export async function PUT(req,params ) {
  try {
    const  body  = await req.json();
    const  id  = params;
    await connectMongoDB();
    await bankAccounts.updateOne({id},{$set: body });
    return new Response(JSON.stringify({message:"Updated successfully"}), {
      status: 200,
    });
  } catch (error) {
    return new Response({ message: "something went wrong.." }, { status: 500 });
  }
}

export async function DELETE({ params }) {
  try {
    const id = params;
    await connectMongoDB();
    await bankAccounts.deleteOne(id);
    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong.." }), {
      status: 500,
    });
  }
}
