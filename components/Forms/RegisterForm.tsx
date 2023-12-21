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
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import error from 'next/error';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const formSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          password: values.password,
        }),
      });
      if (res.ok) {
        toast({
          title: 'Success',
          description: 'Your account created',
        });
        router.push('/login');
      } else {
        toast({
          title: 'Error',
          description: 'Email or username already exists',
          variant: 'destructive',
        });
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
        className='space-y-8 w-[400px] bg bg-brand px-4 py-6 rounded-md flex flex-col items-center text-brandBlack'
      >
        <h2 className='text-2xl font-bold border-b text-center border-brandBlack pb-6  w-full mx-20'>
          Hesap Oluştur
        </h2>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>E Posta Adresi</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' className='py-6' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' className='py-6' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input
                  type='password'
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
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Şifre Tekrar</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='shadcn'
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
          {isSubmitting ? 'Loading...' : 'Hesap Oluştur'}
        </Button>

        <div className='flex flex-col items-center '>
          <p className='text-sm'>Hesabın var mı?</p>
          <Link className='font-semibold' href='/sign-in'>
            Giriş Yap!
          </Link>
        </div>
      </form>
    </Form>
  );
}
