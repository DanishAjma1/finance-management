import connectMongoDB from "../../../lib/mongoDb";
import User from "../../../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );

    const serialized = serialize("auth_token", token, {
      // httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 300,
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Logged Successfully.." }), {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
