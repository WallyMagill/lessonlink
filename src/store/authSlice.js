// store/auth-slice.js

import axios from 'axios';

// const ROOT_URL = 'https://project-api-lessonlink.onrender.com/api';
const ROOT_URL = 'http://localhost:3001/api';

export default function createAuthSlice(set, get) {
  return {
    authenticated: false,
    email: '',
    user: {},
    // have to update load user to retrieve the user data, set this up on backend
    loadUser: async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get(`${ROOT_URL}/users`, { headers: { authorization: token } });
        const user = response.data;
        console.log(user);
        set((state) => ({
          authSlice: {
            ...state.authSlice,
            authenticated: true,
            email: user.email,
            user,
          },
        }));
      } catch (error) {
        console.error('Failed to load user', error);
        localStorage.removeItem('token');
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
        const response = await axios.post(`${ROOT_URL}/auth/signup`, extracted);
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
