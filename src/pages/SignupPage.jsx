import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useStore from '../store';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const signupUser = useStore(({ authSlice }) => authSlice.signupUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement actual login logic here
      console.log(username);
      console.log(email);

      console.log(password);

      await signupUser({ username, email, password }, navigate);
      console.log('Signup attempted with:', { email, password });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" minW="100vw" bg="gray.50">
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="calc(100vh - 64px)"
        p={4}
      >
        <Box
          w="full"
          maxW="md"
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
        >
          <VStack spacing={6}>
            <Heading color="blue.500" size="xl">Welcome Back</Heading>
            <Text color="gray.600">Sign in to your account</Text>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4} w="100%">
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  mt={4}
                >
                  Sign In
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupPage;
