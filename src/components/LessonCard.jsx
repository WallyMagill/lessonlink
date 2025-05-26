import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar, Stack, Box, Text,
  Menu, MenuButton, MenuList, MenuItem,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Portal,
  Button,
  ModalFooter,

} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import useStore from '../store/index';

function LessonCard({ lesson, onDelete }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedColor, setSelectedColor] = useState(lesson.tag || 'white');
  const updateLesson = useStore(({ lessonSlice }) => lessonSlice.updateLesson);
  const deleteLesson = useStore(({ lessonSlice }) => lessonSlice.deleteLesson);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  // added these fns bc both color and delete modals were opening simultaneously

  const openDeleteModal = () => {
    setIsColorModalOpen(false);
    setIsDeleteModalOpen(true);
  };
  const openColorModal = () => {
    setIsDeleteModalOpen(false);
    setIsColorModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeColorModal = () => {
    setIsColorModalOpen(false);
  };

  const COLOR_PALETTE = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple',
    'pink', 'teal', 'cyan',
  ];

  const selectColor = async (color) => {
    try {
      await updateLesson(lesson.id, {
        ...lesson,
        tag: color,
      });
      setSelectedColor(color);
      // Close modal after selected
      closeColorModal();
      // Show success
      toast({
        title: 'Color Updated',
        description: `Lesson color changed to ${color}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error selecting color:', error);

      // Show error
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

  const handleDelete = async () => {
    try {
      await deleteLesson(lesson.id);
      toast({
        title: 'Lesson Deleted',
        description: 'Lesson successfully deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      closeDeleteModal(); // close modal after
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
      borderLeftWidth="6px"
      borderLeftColor={`${selectedColor}.500`}
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
        <Portal>
          <MenuList zIndex="10" position="relative">
            <MenuItem onClick={handleView}>View</MenuItem>
            <MenuItem onClick={handleView}>Edit</MenuItem>
            <MenuItem onClick={openColorModal}>
              Change Folder Color
            </MenuItem>
            <MenuItem onClick={openDeleteModal} color="red.500">
              Delete
            </MenuItem>

            <Modal
              isOpen={isColorModalOpen}
              onClose={closeColorModal}
              size="md"
            >
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

            <Modal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Lesson</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this lesson?
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </MenuList>
        </Portal>
      </Menu>

    </Box>

  );
}

export default LessonCard;
