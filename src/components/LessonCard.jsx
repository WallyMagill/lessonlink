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
  Input,
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
  const [isAddToFolderModalOpen, setIsAddToFolderModalOpen] = useState(false);
  const [isRemoveFromFolderModalOpen, setIsRemoveFromFolderModalOpen] = useState(false);
  const [folderSearch, setFolderSearch] = useState('');
  const [selectedFolders, setSelectedFolders] = useState([]);
  const user = useStore(({ userSlice }) => userSlice.current);
  const folders = user?.folders || {};
  const addLessonToFolder = useStore(({ userSlice }) => userSlice.addLessonToFolder);
  const deleteLessonFromFolder = useStore(({ userSlice }) => userSlice.deleteLessonFromFolder);

  // Filter folders by search
  const filteredFolders = Object.keys(folders).filter((folder) => folder.toLowerCase().includes(folderSearch.toLowerCase()));

  // Get folders the lesson is in
  const lessonFolders = Object.keys(folders).filter((folder) => folders[folder].includes(lesson._id || lesson.id));

  const handleAddToFolder = async () => {
    try {
      await Promise.all(selectedFolders.map((folder) => addLessonToFolder(folder, lesson._id || lesson.id)));
      toast({
        title: 'Lesson added to folders', status: 'success', duration: 2000, isClosable: true,
      });
      setIsAddToFolderModalOpen(false);
      setSelectedFolders([]);
    } catch (error) {
      toast({
        title: 'Error', description: error.message, status: 'error', duration: 3000, isClosable: true,
      });
    }
  };

  const handleRemoveFromFolder = async () => {
    try {
      await Promise.all(selectedFolders.map((folder) => deleteLessonFromFolder(folder, lesson._id || lesson.id)));
      toast({
        title: 'Lesson removed from folders', status: 'success', duration: 2000, isClosable: true,
      });
      setIsRemoveFromFolderModalOpen(false);
      setSelectedFolders([]);
    } catch (error) {
      toast({
        title: 'Error', description: error.message, status: 'error', duration: 3000, isClosable: true,
      });
    }
  };

  const toggleFolderSelection = (folder) => {
    setSelectedFolders((prev) => (prev.includes(folder)
      ? prev.filter((f) => f !== folder)
      : [...prev, folder]));
  };

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
              Change Lesson Color
            </MenuItem>
            <MenuItem onClick={() => setIsAddToFolderModalOpen(true)}>
              Add to Folder
            </MenuItem>
            <MenuItem onClick={() => setIsRemoveFromFolderModalOpen(true)}>
              Remove from Folder
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

            <Modal
              isOpen={isAddToFolderModalOpen}
              onClose={() => setIsAddToFolderModalOpen(false)}
              size="md"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add to Folder</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    placeholder="Search folders..."
                    value={folderSearch}
                    onChange={(e) => setFolderSearch(e.target.value)}
                    mb={4}
                  />
                  <Stack spacing={2}>
                    {filteredFolders.map((folder) => (
                      <Button
                        key={folder}
                        onClick={() => toggleFolderSelection(folder)}
                        bg={selectedFolders.includes(folder) ? 'blue.200' : 'blue.100'}
                        _hover={{ bg: 'blue.300' }}
                      >
                        {folder}
                      </Button>
                    ))}
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => setIsAddToFolderModalOpen(false)} mr={3} variant="ghost">Cancel</Button>
                  <Button colorScheme="blue" onClick={handleAddToFolder}>Add</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal
              isOpen={isRemoveFromFolderModalOpen}
              onClose={() => setIsRemoveFromFolderModalOpen(false)}
              size="md"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Remove from Folder</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={2}>
                    {lessonFolders.map((folder) => (
                      <Button
                        key={folder}
                        onClick={() => toggleFolderSelection(folder)}
                        bg={selectedFolders.includes(folder) ? 'blue.200' : 'blue.100'}
                        _hover={{ bg: 'blue.300' }}
                      >
                        {folder}
                      </Button>
                    ))}
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => setIsRemoveFromFolderModalOpen(false)} mr={3} variant="ghost">Cancel</Button>
                  <Button colorScheme="blue" onClick={handleRemoveFromFolder}>Remove</Button>
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
