import React, { useEffect } from 'react';
import {
  Box, Flex, Stack, Input, IconButton, Button, Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { FaGlobe } from 'react-icons/fa';
import LessonCard from '../components/LessonCard';
import Header from '../components/Header';
import useStore from '../store/index';

function DashboardPage() {
  const navigate = useNavigate();

  const lessons = useStore(({ lessonSlice }) => lessonSlice.all);
  const fetchAllLessons = useStore(({ lessonSlice }) => lessonSlice.fetchAllLessons);
  const createLesson = useStore(({ lessonSlice }) => lessonSlice.createLesson);

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
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
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
        status: 'private',
      });
      navigate(`/edit/${newLesson._id}`);
    } catch (error) {
      console.error('Error creating new lesson:', error);
    }
  };

  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg="gray.50"
      fontFamily="var(--chakra-fonts-body, Arial, sans-serif)"
      overflowX="hidden"
      padding={0}
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
              <Input placeholder="Search grade..." size="md" bg="white" />
              <IconButton icon={<AddIcon />} aria-label="Add grade" colorScheme="blue" />
            </Flex>
            <Box flex={1} overflowY="auto">
              <Stack spacing={4}>
                {['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'].map((grade) => (
                  <Button key={grade} w="100%" bg="blue.100" boxShadow="md" _hover={{ bg: 'blue.200' }}>
                    {grade}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Box>
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
          >
            <Flex mb={4} gap={2} align="center">
              <Input placeholder="Search lesson plan..." size="md" bg="white" />
              <IconButton icon={<FaGlobe />} aria-label="Global toggle" colorScheme="gray" />
              <IconButton icon={<AddIcon />} aria-label="Add lesson" colorScheme="blue" onClick={handleAdd} />
            </Flex>
            <Box flex={1} overflowY="auto" width="100%">
              {lessons.length === 0 && (
                <Text>No lessons available. Click the + button to create one!</Text>
              )}
              {lessons.length > 0 && (
                
                <Flex wrap="wrap" rowGap={6} columnGap={20} justifyContent="space-around" alignItems="flex-start" width="90%">

                  {lessons.map((lesson) => (
                    <Box key={lesson.id}
                      flex="1 0 20rem"
                      maxW="25rem"
                      minW="10rem"
                    >
                      <LessonCard lesson={lesson} />
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
