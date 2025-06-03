// store/auth-slice.js

import axios from 'axios';

const ROOT_URL = 'https://project-api-lessonlink.onrender.com/api';
// const ROOT_URL = 'http://localhost:3001/api';

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
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: fields.email,
            loading: false,
          },
        }));
        localStorage.setItem('token', response.data.token);
        return true;
      } catch (error) {
        console.error('Sign In Failed:', error);
        return false;
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
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: fields.email,
            loading: false,
          },
        }));
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.error('Sign Up Failed:', error);
        const message = error?.response?.data?.message || 'Signup failed. Please try again.';
        // throw new Error(message);
        return { success: false, message };
      }
      return { success: true };
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
