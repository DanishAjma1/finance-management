import Transaction from "../../models/transactions";
import connectMongoDB from "../../lib/mongoDb";
import { ObjectId } from "mongodb";
import User from "../../models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
    console.error("Error in getUserID:", error.message);
    return null;
  }
};

export async function POST(req) {
  try {
    const { description, acc_num, amount, date } = await req.json();

    if (!description || !acc_num || !amount || !date) {
      return new Response(JSON.stringify({ message: "All fields are required" }), {
        status: 400,
      });
    }

    await connectMongoDB();
    const userId = await getUserID();
    if (!userId) {
      return new Response(JSON.stringify({ message: "User id required.." }), {
        status: 400,
      });
    }

    await Transaction.create({
      description,
      amount,
      acc_num,
      date,
      user_id: userId,
    });

    return new Response(
      JSON.stringify({ message: "Data inserted successfully.." }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
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
      { status: 200 }
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
    const userId = await getUserID();
    if (!userId) {
      return new Response(JSON.stringify({ message: "User id required.." }), {
        status: 400,
      });
    }

    const transactions = await Transaction.find({ user_id: userId });
    return new Response(
      JSON.stringify({ transactions }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
