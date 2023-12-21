import RoomCard from '@/components/Cards/RoomCard';
import React from 'react';

const getRoom = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/room/${id}`, {
    next: { revalidate: 60 },
  });
  const room = await res.json();
  return room.room;
};

const page = async ({ params }: any) => {
  const { id } = params;
  const room = await getRoom(id);

  return (
    <div className='flex items-center justify-center'>
      <RoomCard room={room} isSingle={true} />
    </div>
  );
};

export default page;
