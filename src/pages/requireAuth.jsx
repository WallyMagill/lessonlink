import React from 'react';
import { Navigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import useStore from '../store';

// Router Wrapper
function RequireAuth({ children }) {
  const authenticated = useStore(({ authSlice }) => authSlice.authenticated);
  const loading = useStore(({ authSlice }) => authSlice.loading);

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Flex>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default RequireAuth;
