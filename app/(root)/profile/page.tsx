import { auth, signOut } from '@/auth';
import ReservationCard from '@/components/Cards/ReservationCard';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { FormatDate } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';

type userInfo = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
};

const Profile = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: { email: session?.user?.email as string },
    include: {
      reservations: {
        include: {
          roomType: true, // İlgili oda bilgilerini eklemek için Room modelini include et
        },
      },
    },
  });

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <h1 className='text-4xl font-semibold'>Profil</h1>
      <div className='flex items-center mt-10 flex-col pb-4 border border-b-brandBlack'>
        <h2 className='text-2xl font-semibold'>{user?.name}</h2>
        <p className='text-gray-500'>{user?.email}</p>
        <p>{FormatDate(user?.createdAt.toString())}</p>
        {user?.isAdmin && <p>Admin</p>}
        <form
          className='w-full'
          action={async () => {
            'use server';
            await signOut();
            redirect('/sign-in');
          }}
        >
          <Button className='bg-red-500 w-full hover:bg-red-600 transition-colors'>
            Log out
          </Button>
        </form>
      </div>
      {user?.reservations.length ? (
        <div className=' flex flex-col mt-4 items-center justify-center'>
          <h3 className='text-3xl font-semibold mt-10'>Rezervasyonlar</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center  gap-4 container py-4'>
            {user?.reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        </div>
      ) : (
        <p className='text-2xl font-semibold'>Rezervasyon Yok !</p>
      )}
    </div>
  );
};

export default Profile;
