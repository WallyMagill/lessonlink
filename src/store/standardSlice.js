import axios from 'axios';

const API_URL = 'https://project-api-lessonlink.onrender.com/api';

export default function createStandardSlice(set, get) {
  return {
    standards: [],
    hasLoadedStandards: false,

    fetchStandards: async () => {
      try {
        const response = await axios.get(`${API_URL}/standards`);
        set((state) => ({
          ...state,
          standardSlice: {
            ...state.standardSlice,
            standards: response.data,
            hasLoadedStandards: true,
          },
        }), false, 'lessons/fetchAllLessons');
      } catch (error) {
        throw new Error('Error fetching Standards', error);
      }
    },
  };
}
