import { create } from 'zustand';

export const useStore = create<{
  user: {
    id?: string;
    email?: string;
    name?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}>((set) => ({
  user: {},
}));
