// store/auth-slice.js

import axios from 'axios';

const ROOT_URL = 'https://project-api-lessonlink.onrender.com/api';

export default function createAuthSlice(set, get) {
  return {
    authenticated: false,
    email: '',
    user: {},
    loading: true,
    intendedPath: null,

    // these update the path the user was trying to reach
    setIntendedPath: (path) => set((state) => {
      state.authSlice.intendedPath = path;
    }),
    clearIntendedPath: () => set((state) => {
      state.authSlice.intendedPath = null;
    }),
    // have to update load user to retrieve the user data, set this up on backend
    loadUser: async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: false,
            email: '',
            user: {},
            loading: false,
          },
        }));
        return;
      }
      try {
        const response = await axios.get(`${ROOT_URL}/users`, { headers: { authorization: token } });
        const user = response.data;
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: user.email,
            loading: false,
            user,
          },
          userSlice: {
            ...state.userSlice,
            current: user,
            error: null,
          },
        }));
      } catch (error) {
        console.error('Failed to load user', error);
        localStorage.removeItem('token');
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: false,
            email: '',
            user: {},
            loading: false,
          },
        }));
      }
    },
    signinUser: async (fields, navigate) => {
      try {
        const extracted = {
          email: fields.email,
          password: fields.password,
        };

        const response = await axios.post(`${ROOT_URL}/auth/signin`, extracted);
        localStorage.setItem('token', response.data.token);
        const intended = get().authSlice.intendedPath;

        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: fields.email,
            loading: false,
          },
        }));

        navigate(intended || '/dashboard');
        return true;
      } catch (error) {
        if (error.response?.data?.error) {
          console.error('Backend error message:', error.response.data.error);
        }
        throw new Error(error?.response?.data?.error || 'Login failed. Please try again.');
      }
    },
    signupUser: async (fields, navigate) => {
      try {
        const extracted = {
          username: fields.username,
          email: fields.email,
          password: fields.password,
        };

        const response = await axios.post(`${ROOT_URL}/auth/signup`, extracted);
        const intended = get().authSlice.intendedPath;
        localStorage.setItem('token', response.data.token);

        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: fields.email,
            loading: false,
          },
        }));
        navigate(intended || '/dashboard');
        return { success: true };
      } catch (error) {
        const message = error?.response?.data?.message || 'Signup failed. Please try again.';
        return { success: false, message };
      }
    },
    signoutUser: async (navigate) => {
      localStorage.clear();
      set((state) => ({
        authSlice: {
          ...state.authSlice,
          authenticated: false,
          email: '',
          user: {},
          loading: false,
        },
        userSlice: {
          ...state.userSlice,
          current: null,
          error: null,
        },
      }));
    },
  };
}
