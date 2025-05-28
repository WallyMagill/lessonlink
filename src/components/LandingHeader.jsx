import React from 'react';
import {
  Flex,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function LandingHeader() {
  const navigate = useNavigate();

  const handleHome = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <Flex
      as="header"
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      p={4}
      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
      zIndex={10}
    >
      {/* Logo */}

      <Button
        fontWeight="bold"
        fontSize="1.25rem"
        color="#1a365d"
        background="transparent"
        _active={{ opacity: 0.8 }}
        onClick={handleHome}
      >
        LESSONLINK
      </Button>

      {/* Dashboard, Log in, Sign up */}

      <HStack spacing={4}>
        <Button
          onClick={handleHome}
          colorScheme="red"
          variant="solid"
          fontWeight="bold"
        >
          Lessons Dashboard
        </Button>
        <Button onClick={handleSignUp} colorScheme="blue" variant="outline">
          Sign up
        </Button>
        <Button onClick={handleLogIn} colorScheme="blue">
          Log In
        </Button>
      </HStack>
    </Flex>
  );
}

export default LandingHeader;
