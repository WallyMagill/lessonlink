import axios from "axios";

const API_URL = "http://localhost:9090/api";

export default function createUserSlice(set) {
  return {
    all: [],
    current: {},
    error: null,
    loading: false,

    //fetch all users
    fetchAllUsers: async () => {
      set({ loading: true });
      try {
        const response = await axios.get(`${API_URL}/users`);
        set({ all: response.data, loading: false, error: null });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    //fetch one user
    fetchUser: async (id) => {
      set({ loading: true });
      try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        set({ current: response.data, loading: false, error: null });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    //creating a new user
    createUser: async (userData) => {
      set({ loading: true });
      try {
        const response = await axios.post(`${API_URL}/users`, userData);
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

    //updating a user
    updateUser: async (id, userData) => {
      set({ loading: true });
      try {
        const response = await axios.put(`${API_URL}/users/${id}`, userData);
        set((state) => ({
          all: state.all.map((user) =>
            user._id === id ? response.data : user
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

    //deleting a user
    deleteUser: async (id) => {
      set({ loading: true });
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        set((state) => ({
          all: state.all.filter((user) => user._id !== id),
          current: state.current._id === id ? {} : state.current,
          loading: false,
          error: null,
        }));
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    //clearing current user
    clearCurrent: () => {
      set({ current: {} });
    },

    //clear errors
    clearError: () => {
      set({ error: null });
    },
  };
}
