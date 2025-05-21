import React from 'react';
import {
  Box, Flex, Stack, Heading, Tag, TagLabel, IconButton, Input, Switch, Avatar,
} from '@chakra-ui/react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';
import styles from '../styles/ProfilePage.module.css';
import Header from '../components/Header';

function ProfilePage() {
  return (
    <Box className={styles['profile-root']} minH="100vh" minW="100vw">
      {/* Header */}
      <Header />
      <Box className={styles['main-content']} p={4}>
        <Heading as="h1" size="xl" mb={8}>Hello, Fiona</Heading>
        <Flex className={styles['profile-details']}>
          {/* User Preferences */}
          <Box className={styles['profile-preferences']}>
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
            </Stack>
          </Box>
          {/* Account Settings */}
          <Box className={styles['profile-settings']}>
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
