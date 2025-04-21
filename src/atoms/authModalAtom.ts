import { atom } from 'jotai';

export type AuthModalState = {
  isOpen: boolean;
  type: 'login' | 'register' | 'forgotPassword';
};

export const authModalState = atom<AuthModalState>({
  isOpen: false,
  type: 'login',
});