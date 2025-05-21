import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Flex, Stack, Heading, Tag, TagLabel, IconButton, Input, Switch, Avatar, Button,
} from '@chakra-ui/react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';
import Header from '../components/Header';

function ProfilePage() {
  const navigate = useNavigate();
  const handleOut = (event) => {
    event.preventDefault();
    navigate('/');
  };
  return (
    <Box
      width="100vw"
      minH="100vh"
      bg="#f7fafc"
      fontFamily="var(--chakra-fonts-body, Arial, sans-serif)"
      overflowX="hidden"
    >
      <Header />
      <Box p={6}>
        <Heading as="h1" size="xl" mb={8}>Hello, Fiona</Heading>
        <Flex
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="0 2px 6px rgba(0,0,0,0.10)"
          gap={8}
        >
          {/* User Preferences */}
          <Box
            flex={1}
            pr={8}
            borderRight="1px solid"
            borderColor="gray.200"
          >
            <Stack spacing={8}>
              <Box>
                <Flex align="center" gap={2} mb={2}>
                  <Heading as="h3" size="md">Selected Grade Levels:</Heading>
                  <IconButton icon={<AddIcon />} size="sm" variant="ghost" aria-label="Add grade level" />
                </Flex>
                <Stack direction="row" spacing={2}>
                  <Tag size="lg" colorScheme="blue" borderRadius="full">
                    <TagLabel>grade 3</TagLabel>
                    <IconButton icon={<EditIcon />} size="xs" variant="ghost" aria-label="Edit grade 3" ml={1} />
                  </Tag>
                  <Tag size="lg" colorScheme="blue" borderRadius="full">
                    <TagLabel>grade 4</TagLabel>
                    <IconButton icon={<EditIcon />} size="xs" variant="ghost" aria-label="Edit grade 4" ml={1} />
                  </Tag>
                </Stack>
              </Box>
              <Box>
                <Flex align="center" gap={2} mb={2}>
                  <Heading as="h3" size="md">Selected Subjects:</Heading>
                  <IconButton icon={<AddIcon />} size="sm" variant="ghost" aria-label="Add subject" />
                </Flex>
                <Stack direction="row" spacing={2}>
                  <Tag size="lg" colorScheme="teal" borderRadius="full">
                    <TagLabel>math</TagLabel>
                    <IconButton icon={<EditIcon />} size="xs" variant="ghost" aria-label="Edit math" ml={1} />
                  </Tag>
                  <Tag size="lg" colorScheme="teal" borderRadius="full">
                    <TagLabel>science</TagLabel>
                    <IconButton icon={<EditIcon />} size="xs" variant="ghost" aria-label="Edit science" ml={1} />
                  </Tag>
                  <Tag size="lg" colorScheme="teal" borderRadius="full">
                    <TagLabel>reading</TagLabel>
                    <IconButton icon={<EditIcon />} size="xs" variant="ghost" aria-label="Edit reading" ml={1} />
                  </Tag>
                </Stack>
              </Box>
              <Box>
                <Heading as="h3" size="md" mb={2}>Dark Mode:</Heading>
                <Switch size="lg" colorScheme="blue" />
              </Box>
              <Box>
                <Button
                  size="lg"
                  colorScheme="blue"
                  px={6}
                  py={4}
                  fontSize="md"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                  onClick={handleOut}
                >
                  Sign Out
                </Button>
              </Box>
            </Stack>
          </Box>
          {/* Account Settings */}
          <Box
            flex={1}
            pl={8}
          >
            <Stack spacing={8}>
              <Box>
                <Heading as="h3" size="md" mb={2}>Username:</Heading>
                <Input type="text" placeholder="name@school.org" />
              </Box>
              <Box>
                <Heading as="h3" size="md" mb={2}>Password:</Heading>
                <Input type="password" placeholder="xxxxxxxxxx" />
              </Box>
              <Box>
                <Heading as="h3" size="md" mb={2}>Profile Photo:</Heading>
                <Flex align="center" gap={4}>
                  <Avatar name="Fiona" size="2xl" />
                  <IconButton icon={<EditIcon />} aria-label="Edit profile photo" />
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProfilePage;
