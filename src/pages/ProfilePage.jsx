import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Flex, Stack, Heading, IconButton, Input, Avatar, Button, Text,
  Tag, TagLabel, Select,
} from '@chakra-ui/react';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Header from '../components/Header';
import useStore from '../store';
import useUserHandlers from '../handlers/userHandlers';

function ProfilePage() {
  const navigate = useNavigate();
  const store = useStore();
  const { handleUpdateUser } = useUserHandlers();
  const [editedUser, setEditedUser] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    // Assuming we have the current user's ID stored somewhere
    const userId = localStorage.getItem('userId');
    if (userId) {
      store.fetchUser(userId);
    }
  }, []);

  useEffect(() => {
    if (store.current) {
      setEditedUser(store.current);
    }
  }, [store.current]);

  const handleOut = (event) => {
    event.preventDefault();
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleSave = async () => {
    try {
      await handleUpdateUser(editedUser._id, editedUser);
      // Show success message or handle response
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddGrade = () => {
    if (newGrade && !editedUser.grades?.includes(newGrade)) {
      handleChange('grades', [...(editedUser.grades || []), newGrade]);
      setNewGrade('');
    }
  };

  const handleRemoveGrade = (grade) => {
    handleChange('grades', editedUser.grades.filter((g) => g !== grade));
  };

  const handleAddSubject = () => {
    if (newSubject && !editedUser.subjects?.includes(newSubject)) {
      handleChange('subjects', [...(editedUser.subjects || []), newSubject]);
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject) => {
    handleChange('subjects', editedUser.subjects.filter((s) => s !== subject));
  };

  if (store.loading) {
    return <Text>Loading profile...</Text>;
  }

  if (!editedUser) {
    return <Text>User not found</Text>;
  }

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
        <Heading as="h1" size="xl" mb={8}>
          Hello, {editedUser.firstName} {editedUser.lastName}
        </Heading>
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
                  <IconButton
                    icon={<AddIcon />}
                    size="sm"
                    variant="ghost"
                    aria-label="Add grade level"
                    onClick={handleAddGrade}
                  />
                </Flex>
                <Stack direction="row" spacing={2} mb={2}>
                  <Select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    placeholder="Select grade"
                  >
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                  </Select>
                </Stack>
                <Stack direction="row" spacing={2} wrap="wrap">
                  {editedUser.grades?.map((grade) => (
                    <Tag
                      key={grade}
                      size="lg"
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      <TagLabel>{grade}</TagLabel>
                      <IconButton
                        icon={<DeleteIcon />}
                        size="xs"
                        variant="ghost"
                        aria-label={`Remove ${grade}`}
                        ml={1}
                        onClick={() => handleRemoveGrade(grade)}
                      />
                    </Tag>
                  ))}
                </Stack>
              </Box>
              <Box>
                <Flex align="center" gap={2} mb={2}>
                  <Heading as="h3" size="md">Selected Subjects:</Heading>
                  <IconButton
                    icon={<AddIcon />}
                    size="sm"
                    variant="ghost"
                    aria-label="Add subject"
                    onClick={handleAddSubject}
                  />
                </Flex>
                <Stack direction="row" spacing={2} mb={2}>
                  <Select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Select subject"
                  >
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                  </Select>
                </Stack>
                <Stack direction="row" spacing={2} wrap="wrap">
                  {editedUser.subjects?.map((subject) => (
                    <Tag
                      key={subject}
                      size="lg"
                      colorScheme="teal"
                      borderRadius="full"
                    >
                      <TagLabel>{subject}</TagLabel>
                      <IconButton
                        icon={<DeleteIcon />}
                        size="xs"
                        variant="ghost"
                        aria-label={`Remove ${subject}`}
                        ml={1}
                        onClick={() => handleRemoveSubject(subject)}
                      />
                    </Tag>
                  ))}
                </Stack>
              </Box>
              <Box>
                <Flex align="center" gap={2} mb={2}>
                  <Heading as="h3" size="md">School:</Heading>
                </Flex>
                <Input
                  value={editedUser.school}
                  onChange={(e) => handleChange('school', e.target.value)}
                  placeholder="Enter school name"
                />
              </Box>
              <Box>
                <Flex align="center" gap={2} mb={2}>
                  <Heading as="h3" size="md">Role:</Heading>
                </Flex>
                <Input
                  value={editedUser.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  placeholder="Enter role"
                />
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
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
              <Box>
                <Button
                  size="lg"
                  colorScheme="red"
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
                <Heading as="h3" size="md" mb={2}>Email:</Heading>
                <Input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="name@school.org"
                />
              </Box>
              <Box>
                <Heading as="h3" size="md" mb={2}>First Name:</Heading>
                <Input
                  type="text"
                  value={editedUser.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="First Name"
                />
              </Box>
              <Box>
                <Heading as="h3" size="md" mb={2}>Last Name:</Heading>
                <Input
                  type="text"
                  value={editedUser.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Last Name"
                />
              </Box>
              <Box>
                <Heading as="h3" size="md" mb={2}>Profile Photo:</Heading>
                <Flex align="center" gap={4}>
                  <Avatar
                    name={`${editedUser.firstName} ${editedUser.lastName}`}
                    size="2xl"
                  />
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
