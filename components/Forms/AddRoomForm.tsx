'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast, useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const formSchema = z.object({
  roomType: z.string(),
  roomDescription: z.string().min(10).max(500),
  roomPrice: z.coerce.number(),
  roomImgUrl: z.string(),
  roomAvailableCount: z.coerce.number(),
});

export default function AddRoomForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomType: 'King',
      roomDescription: '',
      roomPrice: 0,
      roomImgUrl: '',
      roomAvailableCount: 10,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log('clicked');
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomType: values.roomType,
          roomDescription: values.roomDescription,
          roomPrice: values.roomPrice,
          roomImgUrl: values.roomImgUrl,
          roomAvailableCount: values.roomAvailableCount,
        }),
      });
      if (res.ok) {
        toast({
          title: 'Başarılı',
          description: 'Oda başarıyla eklendi.',
        });
        router.refresh();
      }
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: 'Hata',
          description: data.message,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
    } finally {
      form.reset();
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2 w-[400px] bg bg-brand px-4 py-6 rounded-md flex flex-col items-center text-brandBlack'
      >
        <h2 className='text-2xl font-bold border-b text-center border-brandBlack pb-6  w-full mx-20'>
          Oda Ekle
        </h2>
        <FormField
          control={form.control}
          name='roomType'
          render={({ field }) => (
            <FormItem className=' w-full'>
              <FormLabel>Oda Tipi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Oda tipi seç' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Basic'>Basic</SelectItem>
                  <SelectItem value='Premium'>Premium</SelectItem>
                  <SelectItem value='King'>King</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Lütfen oda tipini belirle</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='roomDescription'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Oda Açıklaması</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='shadcn'
                  className='py-6'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='roomPrice'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Oda Fiyatı {'(Günlük)'}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='shadcn'
                  className='py-6'
                  required
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='roomImgUrl'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Oda Resim Url </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  required
                  placeholder='shadcn'
                  className='py-6'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='roomAvailableCount'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Oda Kontenjan</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='shadcn'
                  required
                  className='py-6'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type='submit'
          className='disabled:bg-zinc-500 mx-auto w-[200px] bg-brandPrimary hover:bg-brandPrimary/80'
        >
          {isSubmitting ? 'Loading...' : 'Oda Ekle'}
        </Button>
      </form>
    </Form>
  );
}
