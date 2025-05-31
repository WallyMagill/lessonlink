import axios from 'axios';

const API_URL = 'https://project-api-lessonlink.onrender.com/api';
// const API_URL = 'http://localhost:3001/api';

export default function createLessonSlice(set, get) {
  return {
    all: [],
    current: {},
    error: null,
    loading: false,

    // fetch all lessons
    fetchAllLessons: async (isAuth) => {
      set((state) => ({
        ...state,
        lessonSlice: {
          ...state.lessonSlice,
          loading: true,
        },
      }), false, 'lessons/fetchAllLessons');

      try {
        let response;
        if (isAuth) {
          response = await axios.get(`${API_URL}/lessons`, { headers: { authorization: localStorage.getItem('token') } });
        } else {
          response = await axios.get(`${API_URL}/lessons/public`, { headers: { authorization: localStorage.getItem('token') } });
        }

        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            all: response.data,
            loading: false,
            error: null,
          },
        }), false, 'lessons/fetchAllLessons');
      } catch (error) {
        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            loading: false,
            error: error.message,
          },
        }));
      }
    },

    // fetch one lesson
    fetchLesson: async (id) => {
      set((state) => ({
        ...state,
        lessonSlice: {
          ...state.lessonSlice,
          loading: true,
        },
      }));

      try {
        const response = await axios.get(`${API_URL}/lessons/${id}`, { headers: { authorization: localStorage.getItem('token') } });
        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            current: response.data,
            loading: false,
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            loading: false,
            error: error.message,
          },
        }));
      }
    },

    // creating a new lesson
    createLesson: async (lessonData) => {
      set((state) => ({
        ...state,
        lessonSlice: {
          ...state.lessonSlice,
          loading: true,
        },
      }));

      try {
        const response = await axios.post(`${API_URL}/lessons`, lessonData, { headers: { authorization: localStorage.getItem('token') } });
        const newLesson = response.data;

        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            all: [...state.lessonSlice.all, newLesson],
            current: newLesson,
            loading: false,
            error: null,
          },
        }));

        return newLesson;
      } catch (error) {
        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            loading: false,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    // updating a lesson
    updateLesson: async (id, lessonData) => {
      set((state) => ({
        ...state,
        lessonSlice: {
          ...state.lessonSlice,
          loading: true,
        },
      }));

      try {
        const response = await axios.put(`${API_URL}/lessons/${id}`, lessonData, { headers: { authorization: localStorage.getItem('token') } });
        const updatedLesson = response.data;

        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            all: state.lessonSlice.all.map((lesson) => (lesson._id === id ? updatedLesson : lesson)),
            current: updatedLesson,
            loading: false,
            error: null,
          },
        }));

        return updatedLesson;
      } catch (error) {
        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            loading: false,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    // deleting a lesson
    deleteLesson: async (id) => {
      set((state) => ({
        ...state,
        lessonSlice: {
          ...state.lessonSlice,
          loading: true,
        },
      }));

      try {
        await axios.delete(`${API_URL}/lessons/${id}`, { headers: { authorization: localStorage.getItem('token') } });

        set((state) => {
          const updatedAll = state.lessonSlice.all.filter((lesson) => lesson._id !== id);
          const isCurrentDeleted = state.lessonSlice.current._id === id;

          return {
            ...state,
            lessonSlice: {
              ...state.lessonSlice,
              all: updatedAll,
              current: isCurrentDeleted ? {} : state.lessonSlice.current,
              loading: false,
              error: null,
            },
          };
        });
      } catch (error) {
        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            loading: false,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    // sharing a lesson
    shareLesson: async (id, email) => {
      try {
        const body = { email };
        await axios.post(`${API_URL}/lessons/${id}/share`, body, {
          headers: { authorization: localStorage.getItem('token') },
        });
      } catch (error) {
        set((state) => ({
          ...state,
          lessonSlice: {
            ...state.lessonSlice,
            loading: false,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    // clearing current lesson
    clearCurrent: () => {
      set((state) => ({
        ...state,
        lessonSlice: {
          ...state.lessonSlice,
          current: {},
        },
      }));
    },

    // clear errors
    clearError: () => {
      set((state) => ({
        ...state,
        lessonSlice: {
          ...state.lessonSlice,
          error: null,
        },
      }));
    },
  };
}
