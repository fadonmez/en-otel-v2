'use client';
import { FormatDate } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const ReservationCard = ({ reservation }: any) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservation/${reservation.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        toast({
          title: 'Rezervasyon başarıyla iptal edildi',
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='grid grid-cols-12 items-center justify-center rounded-lg'>
      <Image
        src={reservation.roomType.imgUrl}
        alt='roomImg'
        width={200}
        height={200}
        className='col-span-4 rounded-s-lg'
      />
      <div className='col-span-8 bg-zinc-300 h-full flex flex-col p-2 rounded-e-lg'>
        <h3>{reservation.roomType.roomType}</h3>
        <div className='w-full flex items-center'>
          <p>Başlangıç:</p>
          <span className='ml-auto'>{FormatDate(reservation.startTime)}</span>
        </div>
        <div className='w-full  flex items-center '>
          <p>Bitiş:</p>
          <span className='ml-auto'>{FormatDate(reservation.endTime)}</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className='mt-auto bg-red-600 p-2 rounded text-white hover:bg-red-600/90'>
            Rezervasyon İptal
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Emin misin ?</AlertDialogTitle>
              <AlertDialogDescription>
                Bu işlem geri alınamaz. Bu işlemi gerçekleştirmek istediğinize
                emin misiniz ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction onClick={handleClick}>Devam</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ReservationCard;
