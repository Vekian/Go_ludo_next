import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import type { Account } from 'next-auth';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.user) {
      throw new Error('Pas de token trouvé');
    }
    const user = token.user as User;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh_token: token.refreshToken,
      }),
    });

    if (!res.ok) {
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
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
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined): Promise<User | null> {
        if (!credentials) return null;
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/api/login_check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            console.error(data);
            throw new Error('Invalid email or password');
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
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, session, user, account, trigger }: { token: JWT; user?: User; account?: Account | null; trigger?: string; session?: Session }) {
      if (trigger === 'update' && session?.user) {
        const userToken = token.user as User;
        token.user = {
          id: session.user.id,
          email: session.user.email,
          roles: session.user.roles,
          name: session.user.name,
          avatar: session.user.avatar,
          token: userToken.token,
        };

        return token;
      }
      if (account?.provider === 'google') {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_SYMFONY_URL}/google/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${account.id_token}`,
            },
          });

          if (!res.ok) {
            throw new Error('Erreur connexion Google API Symfony');
          }

          const data = await res.json();

          // On récupère le token et refresh_token Symfony et les met dans token
          return {
            ...token,
            refreshToken: data.refresh_token,
            accessTokenExpires: Date.now() + 60 * 60 * 1000,
            user: {
              id: data.user.id,
              email: data.user.email,
              roles: data.user.roles,
              name: data.user.username,
              token: data.token,
            },
          };
        } catch (err) {
          console.error('Erreur login Google Symfony :', err);
          return {
            ...token,
            error: 'GoogleAuthError',
          };
        }
      }
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
      if (token.accessTokenExpires && typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
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
