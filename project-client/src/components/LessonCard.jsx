import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Button, Stack, Box, Text,
} from '@chakra-ui/react';

function getBoxShadow(variant) {
  if (variant === 'elevated') return 'lg';
  if (variant === 'subtle') return 'sm';
  return 'none';
}

function LessonCard({ title = 'Lesson' }) {
  const variants = ['subtle', 'outline', 'elevated'];
  const navigate = useNavigate();
  const handleView = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (page reload)
    navigate('/edit');
  };
  return (
    <Stack gap={4} direction="row" wrap="wrap">
      {variants.map((variant) => (
        <Box
          key={variant}
          width="320px"
          borderWidth={variant === 'outline' ? '1px' : '0'}
          boxShadow={getBoxShadow(variant)}
          borderRadius="md"
          bg={variant === 'subtle' ? 'gray.50' : 'white'}
          p={4}
        >
          <Stack spacing={3} align="center">
            <Avatar size="lg" name={title} src="https://picsum.photos/200/300" />
            <Text fontWeight="bold" fontSize="lg" mb={2}>{title}</Text>
            <Text color="gray.600">
              This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Stack direction="row" spacing={2} pt={2} justify="flex-end" width="100%">
              <Button variant="outline" onClick={handleView}>View</Button>
              <Button colorScheme="blue" onClick={handleView}>Join</Button>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

export default LessonCard;
