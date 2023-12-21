import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { signOut } from '@/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RxAvatar } from 'react-icons/rx';
import { redirect } from 'next/navigation';
import { useStore } from '@/src/store';
const Navbar = () => {
  const user = useStore.getState().user;
  return (
    <div className='bg-blue-300 items-center '>
      <div className='container  flex items-center justify-between py-4'>
        <Link href='/'>
          <h1 className='text-3xl font-bold'>EnOtel</h1>
        </Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <RxAvatar size={36} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0 border-none'>
              <DropdownMenuLabel>Merhaba {user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='p-0'>
                <Link className='p-2  w-full' href='/profile'>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='p-0'>
                <Link className='p-2  w-full' href='/rooms'>
                  Rooms
                </Link>
              </DropdownMenuItem>
              {user.isAdmin && (
                <DropdownMenuItem asChild className='p-0'>
                  <Link className='p-2  w-full' href='/admin'>
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className='p-0'>
                <form
                  className='w-full'
                  action={async () => {
                    'use server';
                    await signOut();
                    redirect('/sign-in');
                  }}
                >
                  <Button className='bg-red-500 rounded-none   w-full hover:bg-red-600 transition-colors'>
                    Log out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='flex items-center gap-4'>
            <Link href='/sign-in'>
              <Button className=''>Giriş Yap</Button>
            </Link>
            <Link href='/sign-up'>
              <Button className=''>Kayıt Ol</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
