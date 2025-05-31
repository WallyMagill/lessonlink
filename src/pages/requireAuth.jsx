import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import useStore from '../store';

// Router Wrapper
function RequireAuth({ children }) {
  const authenticated = useStore(({ authSlice }) => authSlice.authenticated);
  const loading = useStore(({ authSlice }) => authSlice.loading);
  const setIntendedPath = useStore((state) => state.authSlice.setIntendedPath);
  const location = useLocation();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Flex>
    );
  }

  if (!authenticated) {
    // we need to store the path (where user wsa trying to go)
    console.log(location.pathname);
    setIntendedPath(location.pathname);
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default RequireAuth;
