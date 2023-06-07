import { connectToDb } from '@/utils';
import { compareSync } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
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
          };
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
});

export { handler as GET, handler as POST };
