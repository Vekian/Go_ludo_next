import { withAuth } from "next-auth/middleware";
console.log("Middleware loaded");

export default withAuth({
  pages: {
    signIn: "/", // Redirection si l'utilisateur n'est pas authentifié
  },
  callbacks: {
    authorized: ({ token }) => {
      console.log("Middleware authorized check:", token);
      // Autorisez les utilisateurs connectés uniquement
      return !!token;
    },
  },
});

export const config = {
  runtime: "edge",
  matcher: ["/:path*"],
};
