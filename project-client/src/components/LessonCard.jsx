import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Button, Stack, Box, Text,
} from '@chakra-ui/react';

function LessonCard({ lesson }) {
  const navigate = useNavigate();

  const handleView = (event) => {
    event.preventDefault();
    navigate(`/edit/${lesson._id}`);
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
    >
      <Stack spacing={3} align="center">
        <Avatar size="lg" name={lesson.title} src="https://picsum.photos/200/300" />
        <Text fontWeight="bold" fontSize="lg" mb={2}>{lesson.title}</Text>
        <Text color="gray.600" noOfLines={2}>
          {lesson.overview || 'No overview available'}
        </Text>
        <Stack direction="row" spacing={2} pt={2} justify="flex-end" width="100%">
          <Button variant="outline" onClick={handleView}>View</Button>
          <Button colorScheme="blue" onClick={handleView}>Edit</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default LessonCard;
