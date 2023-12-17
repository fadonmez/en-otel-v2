import { auth } from '@/auth';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { db } from '@/lib/db';
import { useStore } from '@/src/store';
import React from 'react';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  let user;
  if (session) {
    user = await db.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    useStore.setState({ user: user });
  }
  return (
    <div className='flex flex-col min-h-screen bg-zinc-200 '>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
