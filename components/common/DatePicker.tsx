'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { FormatDate, cn, formatDateTime, formatTarih } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '../ui/use-toast';
import router from 'next/router';
import { useRouter } from 'next/navigation';

export function DatePickerWithRange({
  roomId,
  userId,
  className,
}: {
  roomId: string;
  userId: string | undefined;
  className?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(currentYear, currentMonth, currentDay),
    to: addDays(new Date(currentYear, currentMonth, currentDay), 20),
  });

  const handleClick = async () => {
    // TODO: SEND API REQUEST

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId,
            startTime: formatDateTime(date?.from),
            endTime: formatDateTime(date?.to),
            ownerId: userId,
          }),
        }
      );

      if (res.ok) {
        toast({
          title: 'Rezervasyon başarıyla kaydedildi !',
        });
        router.push('/profile');
      }
      if (!res.ok) {
        toast({
          title: 'Rezervasyon işlemi sırasında bir hata meydana geldi !',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleClick}>Kaydet</Button>
    </div>
  );
}
