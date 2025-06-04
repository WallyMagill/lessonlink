import React from 'react';
import {
  Flex, HStack, Button, Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LessonLinkWhite from '../img/lessonlinkWHITE.png';

function LandingHeader() {
  const navigate = useNavigate();

  const handleNavigate = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <Flex
      as="header"
      flexDirection={{ base: 'column', md: 'row' }}
      width="100%"
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
        onClick={handleNavigate('/dashboard')}
        _active={{ opacity: 0.5 }}
        _hover={{ opacity: 0.8, background: 'transparent' }}
        p={0}
        border="none"
        _focus={{ boxShadow: 'none' }}
        _focusVisible={{ boxShadow: 'none' }}
      >
        <Image src={LessonLinkWhite} alt="LessonLink Logo" height="35px" />
      </Button>
      {/* Navigation Buttons */}
      <HStack spacing={4}>
        <Button
          onClick={handleNavigate('/dashboard')}
          colorScheme="blue"
          variant="solid"
          fontWeight="bold"
        >
          Lessons Dashboard
        </Button>

        <Button
          onClick={handleNavigate('/signup')}
          colorScheme="blue"
          variant="outline"
        >
          Sign up
        </Button>

        <Button
          onClick={handleNavigate('/login')}
          colorScheme="blue"
          variant="solid"
        >
          Log In
        </Button>

      </HStack>

    </Flex>
  );
}

export default LandingHeader;
