import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <div className=' bg-hero-pattern bg-cover bg-center  '>
      <div className=' backdrop-blur-sm '>
        <div className='container  h-[500px] flex flex-col items-center justify-center gap-4  '>
          <h1 className='text-4xl font-bold  text-white'>
            Hayalindeki tatil burada
          </h1>

          <Link href='/rooms'>
            <Button className='bg-brand text-brandBlack text-lg hover:bg-brand/90'>
              Hemen Rezervasyonunu Yap
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
