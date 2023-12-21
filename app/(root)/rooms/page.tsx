import RoomCard from '@/components/Cards/RoomCard';
import React from 'react';

const getRoomData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/room`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};

const Rooms = async () => {
  const rooms = await getRoomData();
  return (
    <div className='container grid place-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-10'>
      {rooms.map((room: any) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default Rooms;
