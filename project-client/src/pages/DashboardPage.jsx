import React from 'react';
import {
  Box, Flex, Stack, Input, IconButton, Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { FaGlobe } from 'react-icons/fa';
import LessonCard from '../components/LessonCard';
import Header from '../components/Header';

const grades = [
  'Grade 3: Biology',
  'Grade 4: Biology',
  'Grade 5: Chemistry',
  'Grade 6: Chemistry',
];

const lessons = Array.from({ length: 12 }, (_, i) => `Lesson ${i + 1}`);

function DashboardPage() {
  const navigate = useNavigate();
  const handleAdd = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (page reload)
    navigate('/edit');
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
              <Stack spacing={3}>
                {grades.map((grade) => (
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
              <Flex wrap="wrap" gap={6} justify="flex-start" width="100%">
                {lessons.map((lesson) => (
                  <Box key={lesson}
                    flexBasis={{
                      base: '100%', sm: '48%', md: '31%', lg: '23%',
                    }}
                    maxW={{
                      base: '100%', sm: '48%', md: '31%', lg: '23%',
                    }}
                    minW="220px"
                  >
                    <LessonCard title={lesson} />
                  </Box>
                ))}
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default DashboardPage;
