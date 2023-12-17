import { create } from 'zustand';

export const useStore = create<{
  user: any;
}>((set) => ({
  user: {},
}));
