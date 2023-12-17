import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-2 h-screen place-items-center '>
      <div className='bg-green-500 max-w-xs p-4 rounded-lg'>
        <h1 className='text-3xl font-semibold'>EnOtel'e Hoşgeldin</h1>
        <p className='mt-5 '>
          EnOtel'e hoşgeldiniz. Hayallerinizdeki tatil bir tık uzağınızda
        </p>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
