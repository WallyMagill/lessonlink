import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Stack, Box, Text,
  Menu, MenuButton, MenuList, MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import useLessonHandlers from '../handlers/lessonHandlers';

function LessonCard({ lesson, onDelete }) {
  const navigate = useNavigate();
  const { handleDeleteLesson } = useLessonHandlers();

  const handleView = (event) => {
    event.preventDefault();
    navigate(`/edit/${lesson._id}`);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await handleDeleteLesson(lesson._id);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  if (!lesson) return null;

  return (
    <Box
      width="320px"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      p={4}
      boxShadow="md"
      _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      position="relative"
    >
      <Stack spacing={3} align="center">
        <Avatar size="lg" name={lesson.title} src="https://picsum.photos/200/300" />
        <Text fontWeight="bold" fontSize="lg" mb={2}>{lesson.title}</Text>
        <Text color="gray.600" noOfLines={2}>
          {lesson.overview || 'No overview available'}
        </Text>
      </Stack>

      <Menu>
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon />}
          variant="ghost"
          size="sm"
          position="absolute"
          bottom="2"
          right="2"
          aria-label="Options"
        />
        <MenuList>
          <MenuItem onClick={handleView}>View</MenuItem>
          <MenuItem onClick={handleView}>Edit</MenuItem>
          <MenuItem onClick={handleDelete} color="red.500">Delete</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default LessonCard;
