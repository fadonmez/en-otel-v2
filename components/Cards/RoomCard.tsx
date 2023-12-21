import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DatePickerWithRange } from '../common/DatePicker';
import { auth } from '@/auth';
import { db } from '@/lib/db';

interface IProps {
  room: {
    id: string;
    roomType: string;
    roomDescription: string;
    price: number;
    imgUrl: string;
    availableCount: number;
  };
  isSingle?: boolean;
}

const RoomCard = async ({ room, isSingle }: IProps) => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  return (
    <div className='w-[400px] h-full bg-brand pb-4  flex flex-col items-center justify-start gap-4 rounded-md'>
      <Image
        src={room.imgUrl}
        alt='roomImg'
        width={400}
        height={200}
        className='rounded-t-md'
      />
      <div className='flex flex-col gap-2 items-center justify-center px-4'>
        <h2 className=' text-xl font-bold'>{room.roomType}</h2>
        {isSingle ? (
          <DatePickerWithRange roomId={room.id} userId={user?.id} />
        ) : (
          <p className=' text-[12px] text-center'>{room.roomDescription}</p>
        )}
      </div>
      <div className='flex items-center justify-between mt-auto w-full px-4 '>
        <p className=' text-sm p-2 bg-blue-300 rounded-lg font-bold'>
          {room.price} TL
        </p>
        <p className=' text-sm text-brandBlack'>
          {room.availableCount < 20
            ? `Acele et son ${room.availableCount} oda !`
            : `Kontenjan: ${room.availableCount} oda`}
        </p>
      </div>

      {!isSingle && (
        <Link href={`/rooms/${room.id}`}>
          <Button className='bg-blue-400 hover:bg-blue-400/80'>
            Rezervasyon Yap
          </Button>
        </Link>
      )}
    </div>
  );
};

export default RoomCard;
