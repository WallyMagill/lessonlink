import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createLessonSlice from './lessonSlice';
import createUserSlice from './userSlice';

const useStore = create(
  devtools(
    (set, get) => ({
      ...createLessonSlice(set, get),
      ...createUserSlice(set, get),
    }),
    {
      name: 'LessonLink Store',
    },
  ),
);

export default useStore;
