import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDb";
import Card from "../../models/cards";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "../../models/users";

const getUserID = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return null;
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      throw new Error("User not found");
    }

    return user._id.toString();
  } catch (error) {
    throw new Error("User undefined");
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    await connectMongoDB();
    const userId = await getUserID();

    if (!userId) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
      });
    }

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
    const userId = await getUserID();
    if (!userId) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
      });
    }
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
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Valid ID is required" }), {
        status: 400,
      });
    }
    const body = await req.json();
    await connectMongoDB();

    const res = await Card.updateOne({ _id: new ObjectId(id) }, { $set: body });
    if (res.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Card not found." }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ message: "Updated Successfully.." }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Valid ID is required" }), {
        status: 400,
      });
    }

    await connectMongoDB();
    const res = await Card.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Card not found." }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ message: "Card Deleted.." }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
