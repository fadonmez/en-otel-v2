'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import Link from 'next/link';
// import { authenticate } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';

interface resType {
  message: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const handleSubmit = async (formData: any) => {
    // try {
    //   const res: resType = await authenticate(formData);
    //   setError(res?.message);
    //   console.log(res);
    //   router.push('/');
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <form
      action={handleSubmit}
      className='flex flex-col gap-4 w-[400px] items-center justify-center bg-brand px-4 py-6 rounded-md text-brandBlack'
    >
      <h2 className='pb-4 text-2xl font-semibold border-b border-b-brandBlack w-full text-center'>
        Giriş Yap
      </h2>
      <div className='w-full'>
        <label>E Posta Adresi</label>
        <Input
          name='email'
          type='email'
          placeholder='shadcn'
          className='py-6'
          required
        />
      </div>

      <div className='w-full'>
        <label>Şifre</label>
        <Input
          name='password'
          type='password'
          placeholder='shadcn'
          className='py-6'
          required
        />
      </div>
      <button
        type='submit'
        className='bg-brandBlack text-brand w-full py-3 rounded-md'
      >
        Giriş Yap
      </button>
      <div className=' flex flex-col mt-10 gap-3 '>
        <div className='flex justify-center items-center gap-8'>
          <Image src='/google.svg' alt='googleicon' width={30} height={30} />
          <Image src='/facebook.svg' alt='googleicon' width={30} height={30} />
        </div>
        <div className='flex flex-col items-center '>
          <p className='text-sm'>Hesabın yok mu?</p>
          <Link className='font-semibold' href='/sign-up'>
            Hesap Oluştur!
          </Link>
        </div>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
