// store/auth-slice.js

import axios from 'axios';

const ROOT_URL = 'https://project-api-lessonlink.onrender.com/api/auth';

export default function createAuthSlice(set, get) {
  return {
    authenticated: false,
    email: '',
    loadUser: () => {
      const token = localStorage.getItem('token');
      if (token) {
        set(({ authSlice }) => { authSlice.authenticated = true; });
      }
    },
    signinUser: async (fields, navigate) => {
      try {
        const extracted = {
          email: fields.email,
          password: fields.password,
        };

        const response = await axios.post(`${ROOT_URL}/signin`, extracted);
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: fields.email,
          },
        }));
        localStorage.setItem('token', response.data.token);
        navigate('/');
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
        const response = await axios.post(`${ROOT_URL}/signup`, extracted);
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: fields.email,
          },
        }));
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } catch (error) {
        console.error('Sign Up Failed:', error);
      }
    },
    signoutUser: async (navigate) => {
      localStorage.clear();
      set((state) => ({
        authSlice: {
          ...state.authSlice,
          authenticated: false,
          email: '',
        },
      }));
    },
  };
}
