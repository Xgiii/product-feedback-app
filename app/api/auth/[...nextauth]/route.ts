import { connectToDb } from '@/utils';
import { compareSync } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      if (user?.username) token.username = user.username;
      return token;
    },
    async session({ session, token }: any) {
      if (token?._id) session.user._id = token._id;
      if (token?.username) session.user.username = token.username;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'johndoe@domain.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'verysecurepassword',
        },
      },

      async authorize(credentials) {
        const client = await connectToDb();
        const user = await client.db().collection('users').findOne({
          username: credentials?.username,
        });
        client.close();
        if (user && compareSync(credentials?.password!, user.password)) {
          return {
            _id: user._id,
            username: user.username,
          } as any;
        } else {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
