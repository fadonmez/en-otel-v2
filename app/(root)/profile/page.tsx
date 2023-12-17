import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { useStore } from '@/src/store';
import { redirect } from 'next/navigation';
import React from 'react';

const Profile = () => {
  const user = useStore.getState().user;
  console.log('profil', user);
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <h1 className='text-4xl font-semibold'>Profil</h1>
      <div className='flex items-center mt-10 flex-col pb-4 border border-b-brandBlack'>
        <h2 className='text-2xl font-semibold'>{user?.name}</h2>
        <p className='text-gray-500'>{user?.email}</p>
        <form
          className='w-full'
          action={async () => {
            'use server';
            await signOut();
            redirect('/sign-in');
          }}
        >
          <Button className='bg-red-500    w-full hover:bg-red-600 transition-colors'>
            Log out
          </Button>
        </form>
      </div>
      <h3 className='text-3xl font-semibold mt-10'>Rezervasyonlar</h3>
    </div>
  );
};

export default Profile;
