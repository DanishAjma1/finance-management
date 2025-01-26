import NextAuth from "next-auth";
import User from "../../../models/users";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectMongoDB from "../../../lib/mongoDb";

export const authOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 120,
  },
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.email = user.email;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      console.log(token);
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email.toString(),
          id: token.id.toString(),
        },
        error: "",
      };
    },
  },
  pages: {
    signIn: "/pages/signIn",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
