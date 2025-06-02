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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
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
  const toast = useToast();

  const user = useStore(({ userSlice }) => userSlice.current);
  const isAuth = useStore(({ authSlice }) => authSlice.authenticated);
  const [isRemixModalOpen, setIsRemixModalOpen] = useState(false);
  const createLesson = useStore(({ lessonSlice }) => lessonSlice.createLesson);

  const [tabIndex] = useState(0);

  useEffect(() => {
    fetchLesson(id).catch((err) => console.error('Error fetching lesson:', err));
  }, [id]);

  const handleEdit = async (event) => {
    event.preventDefault();
    if (!isAuth) {
      toast({
        title: 'Please log in',
        description: 'Please log in or sign up to make changes.',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // If we try to edit a lesson that isn't ours
    if (user?.username !== lesson?.author?.username) {
      setIsRemixModalOpen(true);
    } else {
      navigate(`/edit/${lesson._id}?tab=1`);
    }
  };

  const handleCreateCopy = async () => {
    try {
      const lessonCopy = await createLesson({
        title: lesson.title,
        objectives: lesson.objectives,
        overview: lesson.overview,
        materials: lesson.materials,
        steps: lesson.steps,
        standards: lesson.standards,
        grade: lesson.grade,
        subject: lesson.subject,
        status: 'public',
        shared: [lesson.author.id],
        tag: lesson.tag,
      });
      return lessonCopy;
    } catch (error) {
      console.error('Error remixing lesson');
      return false;
    }
  };

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
          variant="enclosed"
          colorScheme="blue"
        >
          <TabList>
            <Tab color={colors.text}>View</Tab>
            <Tab
              color={colors.text}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEdit(e);
              }}
            >Edit
            </Tab>
            <Modal
              isOpen={isRemixModalOpen}
              onClose={() => {
                setIsRemixModalOpen(false);
              }}
              size="md"
            >
              <ModalOverlay />
              <ModalContent bg={colors.modalBg}>
                <ModalHeader color={colors.text}>Remix Lesson</ModalHeader>
                <ModalCloseButton color={colors.text} />
                <ModalBody color={colors.text}>
                  <Text mb={3}>
                    {'You are about to remix someone else\'s lesson. This will create a copy that you can edit. The original author will be able to view your new lesson.'}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsRemixModalOpen(false);
                    }}
                    mr={3}
                    color={colors.text}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={async () => {
                      const lessonCopy = await handleCreateCopy();
                      if (lessonCopy) {
                        navigate(`/edit/${lessonCopy._id}?tab=1`);
                      }
                      setIsRemixModalOpen(false);
                    }}
                  >
                    Continue
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
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
