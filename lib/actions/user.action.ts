'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const authenticate = async (formData: FormData) => {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials.' };
        default:
          return { message: 'Something went wrong.' };
      }
    }
  }
};
