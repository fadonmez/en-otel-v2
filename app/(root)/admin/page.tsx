import { useStore } from '@/src/store';
import { redirect } from 'next/navigation';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddRoomForm from '@/components/Forms/AddRoomForm';
import { auth } from '@/auth';
import { db } from '@/lib/db';

const Admin = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  if (!user?.isAdmin) {
    redirect('/');
  }

  return (
    <div className='flex flex-col items-center  bg-red-500'>
      <h1 className='mt-10 text-4xl font-semibold'>Admin Panel</h1>
      <Tabs
        defaultValue='reservationQuery'
        className='max-w-md mt-5 bg-blue-500 inline-flex items-center justify-center flex-col'
      >
        <TabsList>
          <TabsTrigger value='addRoom'>Oda Ekle</TabsTrigger>
          <TabsTrigger value='reservationQuery'>
            Rezervasyon Sorgula
          </TabsTrigger>
        </TabsList>
        <TabsContent value='addRoom'>
          <AddRoomForm />
        </TabsContent>
        <TabsContent value='reservationQuery'>
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
