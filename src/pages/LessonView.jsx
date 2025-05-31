import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  List,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import useStore from '../store';
import Header from '../components/Header';
import { useTheme } from '../components/ThemeContext';

function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const lesson = useStore((state) => state.lessonSlice.current);
  const fetchLesson = useStore((state) => state.lessonSlice.fetchLesson);
  const isLoggedIn = useStore((state) => state.authSlice.authenticated);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchLesson(id).catch((err) => console.error('Error fetching lesson:', err));
  }, [id]);

  const handleTabChange = (index) => {
    if (index === 1) {
      if (!isLoggedIn) {
        navigate('/login', { state: { from: `/edit/${id}` } });
      } else {
        navigate(`/edit/${id}`);
      }
    } else {
      setTabIndex(index);
    }
  };

  if (!lesson) {
    return (
      <Box p={8}>
        <Text>Loading lesson...</Text>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      bg={colors.background}
      fontFamily="var(--chakra-fonts-body, Arial, sans-serif)"
      overflow="hidden"
    >
      <Header />

      <Box p={6}
        flex="1"
        overflowY="auto"
      >
        <Tabs
          index={tabIndex}
          onChange={handleTabChange}
          variant="enclosed"
          colorScheme="blue"
        >
          <TabList>
            <Tab color={colors.text}>View</Tab>
            <Tab color={colors.text}>Edit</Tab>
          </TabList>

          <TabPanels
            bg={colors.background}
            borderRadius="xl"
            p={6}
            overflow="hidden"
          >
            <TabPanel>
              <Box maxW="800px" mx="auto" p={6} bg={colors.cardBg} borderRadius="md" boxShadow="0 1px 4px rgba(0,0,0,0.08)">
                <Stack spacing={6}>
                  <Box>
                    <Heading as="h1" size="xl" mb={4} color={colors.text}>{lesson.title}</Heading>
                    <Text fontSize="sm" color={colors.text}>
                      Subject: {lesson.subject} | Grade: {lesson.grade}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>Materials</Heading>
                    <List spacing={2} styleType="disc" pl={4}>
                      {lesson.materials?.map((material) => (
                        <ListItem key={`material-${material}`} color={colors.text}>{material}</ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>Learning Objectives</Heading>
                    <Text whiteSpace="pre-wrap" color={colors.text}>{lesson.objectives}</Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>Overview</Heading>
                    <Text whiteSpace="pre-wrap" color={colors.text}>{lesson.overview}</Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>Procedure</Heading>
                    <OrderedList spacing={2} pl={4}>
                      {lesson.steps?.map((step) => (
                        <ListItem key={`step-${step}`} color={colors.text}>{step}</ListItem>
                      ))}
                    </OrderedList>
                  </Box>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Text color={colors.text}>
                You must be logged in to edit this lesson.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default LessonView;
