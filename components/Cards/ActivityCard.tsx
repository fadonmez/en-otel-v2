import React from 'react';

interface IProps {
  activity: {
    id: string;
    name: string;
    description: string;
  };
}

const ActivityCard = ({ activity }: IProps) => {
  return (
    <div className='p-4 rounded w-[200px] h-[200px] inline-flex flex-col gap-4 items-center justify-start bg-blue-300'>
      <h1 className='text-center text-xl font-semibold'>{activity.name}</h1>
      <p className='text-center'>{activity.description}</p>
    </div>
  );
};

export default ActivityCard;
