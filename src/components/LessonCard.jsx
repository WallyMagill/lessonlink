import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { ChromePicker } from 'react-color';
import {
  Avatar, Stack, Box, Text,
  Menu, MenuButton, MenuList, MenuItem,
  IconButton,
  useToast, // Center, Portal,
  useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import useLessonHandlers from '../handlers/lessonHandlers';
// import updateLessonColor from '../handlers/lessonHandlers';

function LessonCard({ lesson, onDelete }) {
  const navigate = useNavigate();
  const { handleDeleteLesson } = useLessonHandlers();
  const { updateLessonColor } = useLessonHandlers();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedColor, setSelectedColor] = useState(lesson.color || 'gray');

  const COLOR_PALETTE = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple',
    'pink', 'teal', 'cyan',
  ];

  const displayColors = (event) => {
    event.preventDefault();
    onOpen(); // Open the color selection modal
  };

  const selectColor = async (color) => {
    try {
      // Update color in backend
      console.log('one');
      await updateLessonColor(lesson._id, color);
      console.log('two');
      // Update local state
      setSelectedColor(color);
      console.log('three');
      // Close modal
      onClose();
      console.log('four');
      // Show success toast
      toast({
        title: 'Color Updated',
        description: `Lesson color changed to ${color}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error selecting color:', error);

      // Show error toast
      toast({
        title: 'Color Update Failed',
        description: 'Unable to update lesson color',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
    // <Box
    //   width="320px"
    //   borderWidth="1px"
    //   borderRadius="md"
    //   bg="white"
    //   p={4}
    //   boxShadow="md"
    //   _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
    //   transition="all 0.2s"
    //   position="relative"
    <Box
      width="320px"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      p={4}
      boxShadow="md"
      borderLeft={`6px solid ${selectedColor}.500`} // Color indicator
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

          <MenuItem onClick={displayColors}>
            Change Folder Color
          </MenuItem>
          {/* Other menu items */}
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Lesson Color</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={4} spacing={4}>
              {COLOR_PALETTE.map((color) => (
                <Box
                  key={color}
                  bg={`${color}.500`}
                  height="50px"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => selectColor(color)}
                  _hover={{
                    transform: 'scale(1.1)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                />
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Box>

  );
}

export default LessonCard;
