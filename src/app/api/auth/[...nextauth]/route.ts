import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.user) {
      throw new Error("Pas de token trouvé");
    }
    const user = token.user as User;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/token/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh_token: token.refreshToken,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await res.json();

    return {
      ...token,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 heure
      refreshToken: data.refresh_token,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
        name: user.name,
        avatar: user.avatar,
        token: data.token,
      },
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<User | null> {
        if (!credentials) return null;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/login_check`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            throw new Error("Invalid email or password");
          }

          const data = await res.json();

          // Vérifiez que les tokens sont retournés
          if (data.token && data.refresh_token) {
            return {
              id: data.user.id,
              email: data.user.email,
              roles: data.user.roles,
              name: data.user.username,
              avatar: data.user.avatar,
              refreshToken: data.refresh_token,
              token: data.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        return {
          ...token,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 heure
          user: {
            id: user.id,
            email: user.email,
            roles: user.roles,
            name: user.name,
            avatar: user.avatar,
            token: user.token,
          },
        };
      }

      // Si le token d'accès est encore valide, retournez-le
      if (
        token.accessTokenExpires &&
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      // Sinon, rafraîchissez le token
      return await refreshAccessToken(token);
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {
        session.user = {
          ...(token.user as User),
        };
      }
      return session;
    },
  },
};
export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);
