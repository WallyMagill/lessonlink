import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Flex, Stack, Heading, IconButton, Input, Avatar, Button, Text,
  Tag, TagLabel, Select, useToast,
} from '@chakra-ui/react';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Header from '../components/Header';
import useStore from '../store';

function ProfilePage() {
  const toast = useToast();
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState('');

  const updateUser = useStore(({ userSlice }) => userSlice.updateUser);
  const currentUser = useStore(({ authSlice }) => authSlice.user);
  const loadUser = useStore(({ authSlice }) => authSlice.loadUser);

  // don't have the user's id stored anywhere on front currently
  useEffect(() => {
    // Assuming we have the current user's ID stored somewhere
    loadUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setEditedUser(currentUser);
    }
  }, [currentUser]);

  const handleOut = (event) => {
    event.preventDefault();
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleSave = async () => {
    try {
      console.log(editedUser);
      await updateUser(editedUser.id, editedUser);
      navigate('/dashboard');
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box
            bg="green.100"
            color="green.800"
            rounded="md"
            shadow="md"
            fontWeight="medium"
            p={3}
          >
            Your profile was successfully updated!
          </Box>
        ),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box
            bg="red.100"
            color="red.800"
            rounded="md"
            shadow="md"
            fontWeight="medium"
            p={3}
          >
            Sorry! Your profile failed to update.
          </Box>
        ),
      });
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

  if (!editedUser) {
    return <Text>User not found</Text>;
  }

  return (
    <Box
      width="100%"
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
