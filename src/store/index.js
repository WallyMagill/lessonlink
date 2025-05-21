import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createLessonSlice from './lessonSlice';
import createUserSlice from './userSlice';

const useStore = create(
  devtools((...args) => ({
    lessonSlice: createLessonSlice(...args),
    userSlice: createUserSlice(...args),
  })),
);

export default useStore;
