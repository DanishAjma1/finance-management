import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/mongoDb";
import bankAccounts from "../../models/bankAccounts";
import User from "../../models/users";
import { getServerSession } from "next-auth";

const findAccountByAccNum = async (acc_num) => {
  try {
    const account = await bankAccounts.findOne({ acc_num });
    if (!account) {
      throw new Error("Account doesn't exist.");
    }
    return account;
  } catch (error) {
    console.error("Error in findAccountByAccNum:", error.message);
    throw error;
  }
};


export async function POST(req) {
  try {
    const { name, description, balance, acc_num } = await req.json();

    await connectMongoDB();

    const existingAccount = await bankAccounts.findOne({ acc_num });
    if (existingAccount) {
      return new Response(JSON.stringify({ message: "Account already exists" }), {
        status: 400,
      });
    }

    const userId = await getUserID();
    if (!userId) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
      });
    }

    await bankAccounts.create({
      name,
      description,
      balance,
      acc_num,
      user_id: userId,
    });

    return new Response(JSON.stringify({ message: "Data inserted." }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

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
export async function GET(req) {
  try {
    await connectMongoDB();
    const userId = await getUserID(req);
    const bankAccount = await bankAccounts.find({ user_id: userId });
    return NextResponse.json({ bankAccount }, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Valid ID is required." }), {
        status: 400,
      });
    }

    const body = await req.json();
    await connectMongoDB();

    const res = await bankAccounts.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (res.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Bank account not found." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Updated successfully." }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong." }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Valid ID is required." }), {
        status: 400,
      });
    }

    await connectMongoDB();
    const res = await bankAccounts.deleteOne({ _id: new ObjectId(id) });

    if (res.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Bank account not found." }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Account deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong." }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const { acc_num, amount } = await req.json();

    if (!acc_num || typeof amount !== "number" || amount <= 0) {
      return new Response(
        JSON.stringify({ message: "Valid acc_num and amount are required." }),
        { status: 400 }
      );
    }

    await connectMongoDB();
    const account = await findAccountByAccNum(acc_num);

    if (account.balance < amount) {
      return new Response(
        JSON.stringify({ message: "Insufficient balance." }),
        { status: 400 }
      );
    }

    const updatedAmount = account.balance - amount;
    await bankAccounts.updateOne(
      { acc_num: account.acc_num },
      { $set: { balance: updatedAmount } }
    );

    return new Response(
      JSON.stringify({ message: "Account updated successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PATCH:", error.message);
    return new Response(JSON.stringify({ message: "Something went wrong." }), {
      status: 500,
    });
  }
}
