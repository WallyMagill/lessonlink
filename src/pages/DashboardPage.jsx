import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Stack, Input, IconButton, Button, Text,
  useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  useToast, Select, SimpleGrid, Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaGlobe } from 'react-icons/fa';
import LessonCard from '../components/LessonCard';
import Header from '../components/Header';
import useStore from '../store/index';
import { useTheme } from '../components/ThemeContext';

function DashboardPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { colors } = useTheme();

  const [folderSearch, setFolderSearch] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [dragOverFolder, setDragOverFolder] = useState(null);
  const [cardPosition, setCardPosition] = useState(null);
  const [globalView, setGlobalView] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [lessonSearch, setLessonSearch] = useState('');

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const isLoading = useStore(({ authSlice }) => authSlice.loading);
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
        if (!isAuth) {
          setGlobalView(true);
        }
        await fetchAllLessons(isAuth);
      } catch (error) {
        // toast.error(`failed to load all the posts: ${error}`);
      }
    };

    wrapper();
  }, [user]);

  // Filter folders by search
  const filteredFolders = Object.keys(folders).filter((folder) => folder.toLowerCase().includes(folderSearch.toLowerCase()));

  // Filter lessons by selected folder, global view, and current filter
  let displayedLessons = lessons;
  if (lessonSearch && filterType === 'all') {
    const lowerSearch = lessonSearch.toLowerCase();
    displayedLessons = displayedLessons.filter((lesson) => lesson.title?.toLowerCase().includes(lowerSearch)
    || lesson.overview?.toLowerCase().includes(lowerSearch)
    || lesson.objectives?.toLowerCase().includes(lowerSearch)
    || lesson.author?.username?.toLowerCase().includes(lowerSearch));
  } else if (lessonSearch && filterType === 'user') {
    const lowerSearch = lessonSearch.toLowerCase();
    displayedLessons = displayedLessons.filter((lesson) => lesson.author?.username?.toLowerCase().includes(lowerSearch));
  } else if (lessonSearch && filterType === 'title') {
    const lowerSearch = lessonSearch.toLowerCase();
    displayedLessons = displayedLessons.filter((lesson) => lesson.title?.toLowerCase().includes(lowerSearch));
  }
  if (!globalView) {
    displayedLessons = displayedLessons.filter((lesson) => lesson.status === 'protected' || lesson?.author?.username === user?.username);
  }
  if (selectedFolder && folders[selectedFolder]) {
    const lessonIds = folders[selectedFolder];
    displayedLessons = displayedLessons.filter((lesson) => lessonIds.includes(lesson._id || lesson.id));
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

  const handleGlobalToggle = async () => {
    setGlobalView(!globalView);
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

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Flex>
    );
  }
  return (
    <Flex
      minH="100vh"
      minW="100%"
      bg={colors.background}
      fontFamily="var(--chakra-fonts-body, Arial, sans-serif)"
      overflowX="hidden"
      padding={0}
      position="relative"
      flexDirection="column"
    >
      <Header />
      <Flex
        flexGrow={1}
        p={6}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={6}
      >
        {/* Left Sidebar */}
        <Flex
          minW={{ base: '100%', md: '260px' }}
          maxW={{ base: '100%', md: '320px' }}
          bg={colors.sidebarBg}
          p={4}
          borderRadius="md"
          boxShadow="sm"
          height={{ base: 'auto', md: 'calc(100vh - 64px - 32px)' }}
          overflowY="auto"
          flexDirection="column"
        >
          <Flex
            mb={4}
            flexDirection="column"
            width="100%"
            align="stretch"
          >
            <Flex
              width="100%"
              gap={2}
              align="center"
              flexDirection={{ base: 'column', sm: 'row' }}
            >
              <Input
                width="100%"
                placeholder="Search folders..."
                bg={colors.inputBg}
                color={colors.text}
                value={folderSearch}
                onChange={(e) => setFolderSearch(e.target.value)}
                mb={{ base: 2, sm: 0 }}
              />
              <IconButton
                icon={<AddIcon />}
                aria-label="Add folder"
                colorScheme="blue"
                onClick={onAddOpen}
                alignSelf={{ base: 'stretch', sm: 'center' }}
              />
            </Flex>
          </Flex>
          <Stack spacing={2} align="stretch" width="100%">
            {(isAuth ? filteredFolders : ['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'])
              .map((grade) => (
                <Flex
                  key={grade}
                  align="center"
                  position="relative"
                  width="100%"
                  hover={{ bg: colors.hover }}
                  onDragOver={(e) => handleDragOver(e, grade)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, grade)}
                  bg={dragOverFolder === grade ? 'blue.200' : 'transparent'}
                  transition="background-color 0.2s"
                >
                  <Button
                    w="100%"
                    bg={selectedFolder === grade ? 'blue.500' : 'blue.400'}
                    boxShadow="md"
                    _hover={{ bg: 'blue.600' }}
                    onClick={() => setSelectedFolder(selectedFolder === grade ? null : grade)}
                    fontWeight={selectedFolder === grade ? 'bold' : 'normal'}
                    justifyContent="flex-start"
                    pr={selectedFolder === grade ? 10 : 8}
                    color="white"
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
        </Flex>

        {/* Floating Label for Drag Over */}
        {dragOverFolder && cardPosition && (
          <Flex
            flex={1}
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
          </Flex>
        )}
        {/* Add Folder Modal */}
        <Modal isOpen={isAddOpen} onClose={onAddClose} isCentered>
          <ModalOverlay />
          <ModalContent bg={colors.modalBg}>
            <ModalHeader color={colors.text}>Add New Folder</ModalHeader>
            <ModalCloseButton color={colors.text} />
            <ModalBody>
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                bg={colors.inputBg}
                color={colors.text}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onAddClose} mr={3} variant="ghost" color={colors.text}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleAddFolder}>Add</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Delete Folder Modal */}
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
          <ModalOverlay />
          <ModalContent bg={colors.modalBg}>
            <ModalHeader color={colors.text}>Delete Folder</ModalHeader>
            <ModalCloseButton color={colors.text} />
            <ModalBody color={colors.text}>
              Are you sure you want to delete the folder &quot;{folderToDelete}&quot;? This cannot be undone.
            </ModalBody>
            <ModalFooter>
              <Button onClick={onDeleteClose} mr={3} variant="ghost" color={colors.text}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeleteFolder}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Floating Label for Drag Over */}
        {dragOverFolder && cardPosition && (
        <Flex
          flex={1}
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
        </Flex>
        )}

        <Flex
          flex={1}
          bg={colors.sidebarBg}
          p={4}
          borderRadius="md"
          boxShadow="sm"
          display="flex"
          flexDirection="column"
          height="calc(100vh - 64px - 32px)"
          minH={0}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <Flex mb={4} gap={2} align="center" flexDirection={{ base: 'column', sm: 'row' }}>
            <Input
              flex={1}
              placeholder="Search lesson..."
              value={lessonSearch}
              onChange={(e) => setLessonSearch(e.target.value)}
              borderRightRadius={{ base: 'md', sm: 0 }}
              borderTopRightRadius={{ base: 'md', sm: 0 }}
              borderBottomRightRadius={{ base: 'md', sm: 0 }}
              bg={colors.inputBg}
              color={colors.text}
              mb={{ base: 2, sm: 0 }}
            />
            <Select
              width={{ base: '100%', sm: '120px' }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              bg={colors.inputBg}
              color={colors.text}
              borderLeftRadius={{ base: 'md', sm: 0 }}
              borderTopLeftRadius={{ base: 'md', sm: 0 }}
              borderBottomLeftRadius={{ base: 'md', sm: 0 }}
              borderLeft="none"
            >
              <option value="all">All</option>
              <option value="title">Title</option>
              <option value="user">User</option>
            </Select>
            <Flex gap={2}
              ml={2}
              width={{ base: '100%', sm: 'auto' }}
              justifyContent={{ base: 'space-between', sm: 'flex-end' }}
            >
              <IconButton
                icon={<FaGlobe />}
                aria-label="Global toggle"
                onClick={handleGlobalToggle}
                bg={globalView ? 'white' : 'transparent'}
                color={globalView ? 'blue.500' : 'gray.500'}
                _hover={{
                  bg: 'gray.100',
                  color: globalView ? 'blue.600' : 'gray.700',
                }}
                _active={{
                  bg: 'gray.200',
                  transform: 'scale(0.98)',
                }}
                transition="all 0.2s ease"
                boxShadow={globalView ? 'md' : 'none'}
                border="none"
                rounded="full"
              />
              <IconButton icon={<AddIcon />} aria-label="Add lesson" colorScheme="blue" onClick={handleAdd} />
            </Flex>
          </Flex>
          <Box flex={1} overflowY="auto" width="100%">
            {displayedLessons.length === 0 && (
            <Text color={colors.text}>No lessons available. Click the + button to create one!</Text>
            )}
            {displayedLessons.length > 0 && (
            <SimpleGrid minChildWidth="320px" spacing="40px" justifyItems="center">
              {displayedLessons.map((lesson) => (
                <LessonCard key={lesson.id || lesson._id} lesson={lesson} onDelete={(e) => fetchAllLessons(isAuth)} />
              ))}
            </SimpleGrid>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>

  );
}

export default DashboardPage;
