import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';

export const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (
        isLoggedIn &&
        !(nextUrl.pathname === '/sign-up' || nextUrl.pathname === '/sign-in')
      ) {
        return true;
      }
      if (
        isLoggedIn &&
        (nextUrl.pathname === '/sign-up' || nextUrl.pathname === '/sign-in')
      ) {
        return Response.redirect(new URL('/', nextUrl));
      }
      if (
        !isLoggedIn &&
        (nextUrl.pathname === '/sign-up' ||
          nextUrl.pathname === '/sign-in' ||
          nextUrl.pathname === '/')
      ) {
        return true;
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
