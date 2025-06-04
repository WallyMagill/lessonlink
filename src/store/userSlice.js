import axios from 'axios';

const API_URL = 'https://project-api-lessonlink.onrender.com/api';

export default function createUserSlice(set, get) {
  return {
    all: [],
    current: {},
    error: null,
    loading: false,

    // fetch one user
    fetchUser: async (id) => {
      set((state) => ({
        ...state,
        userSlice: {
          ...state.userSlice,
          loading: true,
        },
      }));

      try {
        const response = await axios.get(`${API_URL}/users/`);
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            current: response.data,
            loading: false,
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            loading: false,
            error: error.message,
          },
        }));
      }
    },

    // creating a new user
    createUser: async (userData) => {
      set((state) => ({
        ...state,
        userSlice: {
          ...state.userSlice,
          loading: true,
        },
      }));

      try {
        const response = await axios.post(`${API_URL}/users`, userData);
        const newUser = response.data;

        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            all: [...state.userSlice.all, newUser],
            current: newUser,
            loading: false,
            error: null,
          },
        }));

        return newUser;
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            loading: false,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    // updating a user
    updateUser: async (id, userData) => {
      set((state) => ({
        ...state,
        userSlice: {
          ...state.userSlice,
          loading: true,
        },
      }));

      try {
        const response = await axios.put(`${API_URL}/users`, userData, { headers: { authorization: localStorage.getItem('token') } });
        const updatedUser = response.data;

        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            all: state.userSlice.all.map((user) => (user._id === id ? updatedUser : user)),
            current: updatedUser,
            loading: false,
            error: null,
          },
        }));

        return updatedUser;
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            loading: false,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    // deleting a user
    deleteUser: async (id) => {
      set((state) => ({
        ...state,
        userSlice: {
          ...state.userSlice,
          loading: true,
        },
      }));

      try {
        await axios.delete(`${API_URL}/users`, { headers: { authorization: localStorage.getItem('token') } });

        set((state) => {
          const updatedAll = state.userSlice.all.filter((user) => user._id !== id);
          const isCurrentDeleted = state.userSlice.current._id === id;

          return {
            ...state,
            userSlice: {
              ...state.userSlice,
              all: updatedAll,
              current: isCurrentDeleted ? {} : state.userSlice.current,
              loading: false,
              error: null,
            },
          };
        });
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            loading: false,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    createFolder: async (foldername) => {
      try {
        const body = { foldername };
        const result = await axios.post(`${API_URL}/users/folders`, body, { headers: { authorization: localStorage.getItem('token') } });
        const updatedUser = result.data;
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            current: updatedUser,
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    addLessonToFolder: async (foldername, lessonId) => {
      try {
        const body = { foldername, lessonId };
        const result = await axios.put(`${API_URL}/users/folders`, body, { headers: { authorization: localStorage.getItem('token') } });
        const updatedUser = result.data;
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            current: updatedUser,
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    deleteFolder: async (foldername) => {
      try {
        const body = { foldername };
        const result = await axios.delete(
          `${API_URL}/users/folders`,
          {
            data: body,
            headers: { authorization: localStorage.getItem('token') },
          },
        );
        const updatedUser = result.data;
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            current: updatedUser,
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    renameFolder: async (oldName, newName) => {
      try {
        const body = { oldName, newName };
        const result = await axios.put(
          `${API_URL}/users/folders/rename`,
          body,
          { headers: { authorization: localStorage.getItem('token') } },
        );
        const updatedUser = result.data;
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            current: updatedUser,
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    deleteLessonFromFolder: async (foldername, lessonId) => {
      try {
        const body = { foldername, lessonId };
        const result = await axios.delete(
          `${API_URL}/users/folders/lesson`,
          {
            data: body,
            headers: { authorization: localStorage.getItem('token') },
          },
        );
        const updatedUser = result.data;
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            current: updatedUser,
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    toggleTheme: async () => {
      try {
        const result = await axios.put(`${API_URL}/users/theme`, {}, { headers: { authorization: localStorage.getItem('token') } });
        const newTheme = result.data;
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            current: {
              ...state.userSlice.current,
              theme: newTheme,
            },
            error: null,
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          userSlice: {
            ...state.userSlice,
            error: error.message,
          },
        }));
        throw error;
      }
    },

    // clearing current user
    clearCurrent: () => {
      set((state) => ({
        ...state,
        userSlice: {
          ...state.userSlice,
          current: {},
        },
      }));
    },

    // clear errors
    clearError: () => {
      set((state) => ({
        ...state,
        userSlice: {
          ...state.userSlice,
          error: null,
        },
      }));
    },
  };
}
