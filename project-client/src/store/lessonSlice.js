import axios from "axios";

const API_URL = "http://localhost:9090/api";

export default function createLessonSlice(set) {
  return {
    all: [],
    current: {},
    error: null,
    loading: false,

    //fetch all lessons
    fetchAllLessons: async () => {
      set({ loading: true });
      try {
        const response = await axios.get(`${API_URL}/lessons`);
        set({ all: response.data, loading: false, error: null });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    //fetch one lessons
    fetchLesson: async (id) => {
      set({ loading: true });
      try {
        const response = await axios.get(`${API_URL}/lessons/${id}`);
        set({ current: response.data, loading: false, error: null });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    //creating a new lesson
    createLesson: async (lessonData) => {
      set({ loading: true });
      try {
        const response = await axios.post(`${API_URL}/lessons`, lessonData);
        set((state) => ({
          all: [...state.all, response.data],
          current: response.data,
          loading: false,
          error: null,
        }));
        return response.data;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    //updating a lesson
    updateLesson: async (id, lessonData) => {
      set({ loading: true });
      try {
        const response = await axios.put(
          `${API_URL}/lessons/${id}`,
          lessonData
        );
        set((state) => ({
          all: state.all.map((lesson) =>
            lesson._id === id ? response.data : lesson
          ),
          current: response.data,
          loading: false,
          error: null,
        }));
        return response.data;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    //deleting a lesson
    deleteLesson: async (id) => {
      set({ loading: true });
      try {
        await axios.delete(`${API_URL}/lessons/${id}`);
        set((state) => ({
          all: state.all.filter((lesson) => lesson._id !== id),
          current: state.current._id === id ? {} : state.current,
          loading: false,
          error: null,
        }));
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    //clearing current lesson
    clearCurrent: () => {
      set({ current: {} });
    },

    //clear errors
    clearError: () => {
      set({ error: null });
    },
  };
}
