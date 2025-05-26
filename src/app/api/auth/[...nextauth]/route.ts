import NextAuth from "next-auth";
import { authOptions } from "@/lib/api/nextAuth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
