import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Stack, Input, IconButton, Button, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaGlobe } from 'react-icons/fa';
import LessonCard from '../components/LessonCard';
import Header from '../components/Header';
import useStore from '../store/index';

function DashboardPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [folderSearch, setFolderSearch] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [dragOverFolder, setDragOverFolder] = useState(null);
  const [cardPosition, setCardPosition] = useState(null);

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const loadUser = useStore(({ authSlice }) => authSlice.loadUser);
  const lessons = useStore(({ lessonSlice }) => lessonSlice.all);
  const fetchAllLessons = useStore(({ lessonSlice }) => lessonSlice.fetchAllLessons);
  const createLesson = useStore(({ lessonSlice }) => lessonSlice.createLesson);
  const isAuth = useStore(({ authSlice }) => authSlice.authenticated);
  const createFolder = useStore(({ userSlice }) => userSlice.createFolder);
  const deleteFolder = useStore(({ userSlice }) => userSlice.deleteFolder);
  const user = useStore(({ userSlice }) => userSlice.current);
  const folders = user?.folders || {};
  const addLessonToFolder = useStore(({ userSlice }) => userSlice.addLessonToFolder);

  useEffect(() => {
  // use a wrapper so can catch failed promises
    const wrapper = async () => {
      try {
        await fetchAllLessons();
      } catch (error) {
        // toast.error(`failed to load all the posts: ${error}`);
      }
    };

    wrapper();
  }, [user]);

  // Fetch user data if authenticated
  useEffect(() => {
    const wrapper = async () => {
      try {
        if (isAuth) {
          await loadUser(); // This should populate userSlice.current
          await fetchAllLessons();
        }
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };

    wrapper();
  }, [isAuth, loadUser]);

  // Filter folders by search
  const filteredFolders = Object.keys(folders).filter((folder) => folder.toLowerCase().includes(folderSearch.toLowerCase()));

  // Filter lessons by selected folder
  let displayedLessons = lessons;
  if (selectedFolder && folders[selectedFolder]) {
    const lessonIds = folders[selectedFolder];
    displayedLessons = lessons.filter((lesson) => lessonIds.includes(lesson._id || lesson.id));
  }

  // Add folder handler
  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      await createFolder(newFolderName.trim());
      setNewFolderName('');
      onAddClose();
      toast({
        title: 'Folder created', status: 'success', duration: 2000, isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error', description: error.message, status: 'error', duration: 3000, isClosable: true,
      });
    }
  };

  // Delete folder handler
  const handleDeleteFolder = async () => {
    if (!folderToDelete) return;
    try {
      await deleteFolder(folderToDelete);
      if (selectedFolder === folderToDelete) setSelectedFolder(null);
      setFolderToDelete(null);
      onDeleteClose();
      toast({
        title: 'Folder deleted', status: 'success', duration: 2000, isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error', description: error.message, status: 'error', duration: 3000, isClosable: true,
      });
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!isAuth) {
      navigate('/login');
      return;
    }
    try {
      const newLesson = await createLesson({
        title: 'New Lesson',
        objectives: '',
        overview: '',
        materials: [],
        steps: [],
        standards: [],
        grade: 0,
        subject: '',
        status: 'public',
      });
      navigate(`/edit/${newLesson._id}`);
    } catch (error) {
      console.error('Error creating new lesson:', error);
    }
  };

  const handleDragOver = (e, folder) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverFolder(folder);
  };

  const handleDragLeave = () => {
    setDragOverFolder(null);
  };

  const handleDragEnd = () => {
    setDragOverFolder(null);
    setCardPosition(null);
  };

  const handleDrop = async (e, folder) => {
    e.preventDefault();
    setDragOverFolder(null);
    setCardPosition(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      await addLessonToFolder(folder, data.lessonId);
      toast({
        title: 'Lesson Added',
        description: `Added "${data.lessonTitle}" to "${folder}"`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
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

  const handleDragStart = (e) => {
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      setCardPosition(data.position);
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  return (
    <Box
      minH="100vh"
      minW="100%"
      bg="gray.50"
      fontFamily="var(--chakra-fonts-body, Arial, sans-serif)"
      overflowX="hidden"
      padding={0}
      position="relative"
    >
      <Header />
      <Box p={6}>
        <Flex minH="calc(100vh - 64px)" gap={6}>
          {/* Left Sidebar */}
          <Box
            minW="260px"
            maxW="320px"
            bg="gray.100"
            p={4}
            borderRadius="md"
            boxShadow="sm"
            display="flex"
            flexDirection="column"
            height="100%"
            overflowY="auto"
          >
            <Flex mb={4} gap={2} align="center">
              <Input
                placeholder="Search folders..."
                size="md"
                bg="white"
                value={folderSearch}
                onChange={(e) => setFolderSearch(e.target.value)}
              />
              <IconButton
                icon={<AddIcon />}
                aria-label="Add folder"
                colorScheme="blue"
                onClick={onAddOpen}
              />
            </Flex>
            <Box flex={1} overflowY="auto">
              <Stack spacing={2}>
                {(isAuth ? filteredFolders : ['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'])
                  .map((grade) => (
                    <Flex
                      key={grade}
                      align="center"
                      position="relative"
                      _hover={{ bg: 'blue.50' }}
                      onDragOver={(e) => handleDragOver(e, grade)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, grade)}
                      bg={dragOverFolder === grade ? 'blue.200' : 'transparent'}
                      transition="background-color 0.2s"
                      borderRadius="md"
                      p={1}
                    >
                      <Button
                        w="100%"
                        bg={selectedFolder === grade ? 'blue.200' : 'blue.100'}
                        boxShadow="md"
                        _hover={{ bg: 'blue.300' }}
                        onClick={() => setSelectedFolder(selectedFolder === grade ? null : grade)}
                        fontWeight={selectedFolder === grade ? 'bold' : 'normal'}
                        justifyContent="flex-start"
                        pr={selectedFolder === grade ? 10 : 8}
                      >
                        {grade}
                      </Button>
                      {isAuth && (
                        <IconButton
                          icon={<DeleteIcon />}
                          aria-label="Delete folder"
                          size="xs"
                          colorScheme="red"
                          variant="ghost"
                          position="absolute"
                          right={1}
                          top="50%"
                          transform="translateY(-50%)"
                          opacity={0.7}
                          onClick={() => { setFolderToDelete(grade); onDeleteOpen(); }}
                        />
                      )}
                    </Flex>
                  ))}
              </Stack>
            </Box>
          </Box>
          {/* Floating Label for Drag Over */}
          {dragOverFolder && cardPosition && (
            <Box
              position="fixed"
              left={cardPosition.x}
              top={cardPosition.y}
              width={cardPosition.width}
              height={cardPosition.height}
              bg="blue.500"
              color="white"
              borderRadius="md"
              boxShadow="2xl"
              zIndex={1000}
              pointerEvents="none"
              transition="all 0.2s"
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              opacity={0.9}
            >
              <Text fontWeight="bold" fontSize="lg">Add to {dragOverFolder}</Text>
            </Box>
          )}
          {/* Add Folder Modal */}
          <Modal isOpen={isAddOpen} onClose={onAddClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Folder</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onAddClose} mr={3} variant="ghost">Cancel</Button>
                <Button colorScheme="blue" onClick={handleAddFolder}>Add</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Delete Folder Modal */}
          <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Folder</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to delete the folder &quot;{folderToDelete}&quot;? This cannot be undone.
              </ModalBody>
              <ModalFooter>
                <Button onClick={onDeleteClose} mr={3} variant="ghost">Cancel</Button>
                <Button colorScheme="red" onClick={handleDeleteFolder}>Delete</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Main Content */}
          <Box
            flex={1}
            bg="gray.100"
            p={4}
            borderRadius="md"
            boxShadow="sm"
            display="flex"
            flexDirection="column"
            height="calc(100vh - 64px - 32px)"
            minH={0}
            overflowY="auto"
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <Flex mb={4} gap={2} align="center">
              <Input placeholder="Search lesson plan..." size="md" bg="white" />
              <IconButton icon={<FaGlobe />} aria-label="Global toggle" colorScheme="gray" />
              <IconButton icon={<AddIcon />} aria-label="Add lesson" colorScheme="blue" onClick={handleAdd} />
            </Flex>
            <Box flex={1} overflowY="auto" width="100%">
              {displayedLessons.length === 0 && (
                <Text>No lessons available. Click the + button to create one!</Text>
              )}
              {displayedLessons.length > 0 && (
                <Flex wrap="wrap" rowGap={6} columnGap={20} justifyContent="space-around" alignItems="flex-start" width="90%">
                  {displayedLessons.map((lesson) => (
                    <Box key={lesson.id || lesson._id}
                      flex="1 0 20rem"
                      maxW="25rem"
                      minW="10rem"
                    >
                      <LessonCard lesson={lesson} onDelete={(e) => fetchAllLessons()} />
                    </Box>
                  ))}
                </Flex>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default DashboardPage;
