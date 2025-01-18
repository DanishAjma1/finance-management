import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDb";
import bankAccounts from "../../models/bankAccounts";
import { ObjectId } from "mongodb";



export async function POST(req) {
  try {
    const { name, description, balance } = await req.json();
    await connectMongoDB();
    const saveAccount = await bankAccounts.create({
      name,
      description,
      balance,
    });
    return new Response(
      JSON.stringify({ saveAccount }, { message: "Data added successfully.." }),
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

    return new Response(JSON.stringify({ message: "Account deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during deletion:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}