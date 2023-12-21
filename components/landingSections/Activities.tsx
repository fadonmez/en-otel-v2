import React from 'react';

import { activities } from '@/constants';
import ActivityCard from '../Cards/ActivityCard';

const Activities = () => {
  return (
    <div className='bg-zinc-200'>
      <div className='container py-6'>
        <h1 className='text-center mb-6 text-3xl font-semibold'>Aktiviteler</h1>
        <div className='grid grid-cols-4 gap-3 place-items-center'>
          {activities.map((activity) => (
            <ActivityCard activity={activity} key={activity.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
