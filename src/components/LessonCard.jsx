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
import { useTheme } from './ThemeContext';

function LessonCard({ lesson, onDelete }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedColor, setSelectedColor] = useState(lesson.tag || 'white');
  const updateLesson = useStore(({ lessonSlice }) => lessonSlice.updateLesson);
  const deleteLesson = useStore(({ lessonSlice }) => lessonSlice.deleteLesson);
  const fetchAllLessons = useStore(({ lessonSlice }) => lessonSlice.fetchAllLessons);
  const isAuth = useStore(({ authSlice }) => authSlice.authenticated);
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
  const { colors } = useTheme();

  // Filter folders by search
  const filteredFolders = Object.keys(folders).filter((folder) => folder.toLowerCase().includes(folderSearch.toLowerCase()));

  // Get folders the lesson is in
  const lessonFolders = Object.keys(folders).filter((folder) => folders[folder].includes(lesson._id || lesson.id));

  // Filter folders to only show folders the lesson is not in
  const availableFolders = filteredFolders.filter((folder) => !lessonFolders.includes(folder));

  const handleAddToFolder = async () => {
    if (selectedFolders.length === 0) {
      toast({
        title: 'No Folders Selected',
        description: 'Please select at least one folder to add the lesson to',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await Promise.all(selectedFolders.map((folder) => addLessonToFolder(folder, lesson._id || lesson.id)));
      toast({
        title: 'Lesson added to folders',
        description: `Added to ${selectedFolders.length} folder${selectedFolders.length > 1 ? 's' : ''}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setIsAddToFolderModalOpen(false);
      setSelectedFolders([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveFromFolder = async () => {
    if (selectedFolders.length === 0) {
      toast({
        title: 'No Folders Selected',
        description: 'Please select at least one folder to remove the lesson from',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      await Promise.all(selectedFolders.map((folder) => deleteLessonFromFolder(folder, lesson._id || lesson.id)));
      toast({
        title: 'Lesson removed from folders',
        description: `Removed from ${selectedFolders.length} folder${selectedFolders.length > 1 ? 's' : ''}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setIsRemoveFromFolderModalOpen(false);
      setSelectedFolders([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
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
      // Refresh lessons after color update
      await fetchAllLessons(isAuth);
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
    navigate(`/edit/${lesson._id}?tab=1`);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    navigate(`/edit/${lesson._id}?tab=0`);
  };

  const handleDelete = async () => {
    try {
      if (user?.id !== lesson?.author?.id) {
        toast({
          title: 'Invalid Delete',
          description: 'Cannot delete a lesson not created by you',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }
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

  const handleDragStart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.dataTransfer.setData('text/plain', JSON.stringify({
      lessonId: lesson._id || lesson.id,
      lessonTitle: lesson.title,
      position: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      },
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  if (!lesson) return null;

  return (
    <Box
      width="320px"
      height="230px"
      borderWidth="1px"
      borderRadius="md"
      bg={colors.cardBg}
      boxShadow="md"
      borderLeftWidth="6px"
      borderLeftColor={`${selectedColor}.500`}
      _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      position="relative"
      draggable
      onDragStart={handleDragStart}
      cursor="grab"
      _active={{ cursor: 'grabbing' }}
      display="flex"
      flexDirection="column"
      onClick={handleView}
    >

      {/* Lesson image & title */}
      <Box
        height="100px"
        backgroundImage='linear-gradient(rgba(62, 65, 69, 0.59)), url("https://picsum.photos/320/180")'
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontWeight="bold"
          fontSize="xl"
          color="white"
          textAlign="center"
          textShadow="2px 2px 4px rgba(0,0,0,0.8)"
          px={4}
          maxW="220px"
          noOfLines={2}
        >
          {lesson.title}
        </Text>
      </Box>

      {/* Lesson Overview */}

      <Box pt="5" px="10">
        <Text
          color={colors.text}
          textAlign="center"
          maxW="220px"
          lineHeight="1.4"
          noOfLines={2}
        >
          {lesson.overview || 'No overview available'}
        </Text>
      </Box>

      {/** Author Avatar & Name */}

      <Box
        position="absolute"
        bottom="2"
        left="2"
        display="flex"
        alignItems="center"
        gap={2}
        pl="0.5"
        pb="1"
      >
        <Avatar
          size="sm"
          name={lesson?.author?.username}
          src="https://picsum.photos/40/40"
        />
        <Text fontSize="sm" color={colors.text} fontWeight="medium">
          {lesson?.author?.username}
        </Text>
      </Box>

      {/** Menu */}

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
          color={colors.text}
          onClick={(e) => e.stopPropagation()}
        />
        <Portal>
          <MenuList zIndex="10" position="relative" bg={colors.modalBg} onClick={(e) => e.stopPropagation()}>
            <MenuItem onClick={(e) => { e.stopPropagation(); handleView(e); }} bg={colors.modalBg} color={colors.text} _hover={{ bg: colors.hover }}>View</MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); handleEdit(e); }} bg={colors.modalBg} color={colors.text} _hover={{ bg: colors.hover }}>Edit</MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); openColorModal(); }} bg={colors.modalBg} color={colors.text} _hover={{ bg: colors.hover }}>
              Change Lesson Color
            </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setIsAddToFolderModalOpen(true); }} bg={colors.modalBg} color={colors.text} _hover={{ bg: colors.hover }}>
              Add to Folder
            </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setIsRemoveFromFolderModalOpen(true); }} bg={colors.modalBg} color={colors.text} _hover={{ bg: colors.hover }}>
              Remove from Folder
            </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); openDeleteModal(); }} bg={colors.modalBg} color="red.500" _hover={{ bg: colors.hover }}>
              Delete
            </MenuItem>

            <Modal
              isOpen={isColorModalOpen}
              onClose={closeColorModal}
              size="md"
            >
              <ModalOverlay />
              <ModalContent bg={colors.modalBg}>
                <ModalHeader color={colors.text}>Select Lesson Color</ModalHeader>
                <ModalCloseButton color={colors.text} />
                <ModalBody>
                  <SimpleGrid columns={4} spacing={4}>
                    {COLOR_PALETTE.map((color) => (
                      <Box
                        key={color}
                        bg={`${color}.500`}
                        height="50px"
                        borderRadius="md"
                        cursor="pointer"
                        onClick={(e) => { e.stopPropagation(); selectColor(color); }}
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
              <ModalContent bg={colors.modalBg}>
                <ModalHeader color={colors.text}>Delete Lesson</ModalHeader>
                <ModalCloseButton color={colors.text} />
                <ModalBody color={colors.text}>
                  Are you sure you want to delete this lesson?
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={closeDeleteModal}
                    color={colors.text}
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
              <ModalContent bg={colors.modalBg}>
                <ModalHeader color={colors.text}>Add to Folder</ModalHeader>
                <ModalCloseButton color={colors.text} />
                <ModalBody>
                  <Input
                    placeholder="Search folders..."
                    value={folderSearch}
                    onChange={(e) => setFolderSearch(e.target.value)}
                    mb={4}
                    bg={colors.inputBg}
                    color={colors.text}
                  />
                  <Stack spacing={2}>
                    {availableFolders.map((folder) => (
                      <Button
                        key={folder}
                        onClick={(e) => { e.stopPropagation(); toggleFolderSelection(folder); }}
                        bg={selectedFolders.includes(folder) ? 'blue.300' : 'blue.100'}
                        _hover={{ bg: 'blue.300' }}
                        color={colors.text}
                      >
                        {folder}
                      </Button>
                    ))}
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => setIsAddToFolderModalOpen(false)} mr={3} variant="ghost" color={colors.text}>Cancel</Button>
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
              <ModalContent bg={colors.modalBg}>
                <ModalHeader color={colors.text}>Remove from Folder</ModalHeader>
                <ModalCloseButton color={colors.text} />
                <ModalBody>
                  <Stack spacing={2}>
                    {lessonFolders.map((folder) => (
                      <Button
                        key={folder}
                        onClick={(e) => { e.stopPropagation(); toggleFolderSelection(folder); }}
                        bg={selectedFolders.includes(folder) ? 'blue.300' : 'blue.100'}
                        _hover={{ bg: 'blue.300' }}
                        color={colors.text}
                      >
                        {folder}
                      </Button>
                    ))}
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => setIsRemoveFromFolderModalOpen(false)} mr={3} variant="ghost" color={colors.text}>Cancel</Button>
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
