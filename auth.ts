import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { db } from './lib/db';
import bcrypt from 'bcrypt';

const login = async (credentials: any) => {
  console.log('in login:', credentials);
  try {
    const existingUser: any = await db.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    if (!existingUser) {
      throw new Error('user not found');
    }
    console.log('existingUser:', existingUser);
    console.log('credentials:', credentials);

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      existingUser.password
    );

    if (!passwordMatch) {
      throw new Error('password is incorrect');
    }

    const user = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    return user;
  } catch (error) {
    return null;
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log('user:', user);
          return user;
        } catch (error) {
          console.log('at catch', error);
          return null;
        }
      },
    }),
  ],
});
