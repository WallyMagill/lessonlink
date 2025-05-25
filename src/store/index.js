import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createLessonSlice from './lessonSlice';
import createUserSlice from './userSlice';
import createAuthSlice from './authSlice';

const useStore = create(
  devtools(immer((...args) => ({
    lessonSlice: createLessonSlice(...args),
    userSlice: createUserSlice(...args),
    authSlice: createAuthSlice(...args),
  }))),
);

export default useStore;
