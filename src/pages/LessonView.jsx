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
  Flex,
  Switch,
  FormControl,
  FormLabel,
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
  const [isCustomView, setIsCustomView] = useState(false);

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

  const renderTemplateView = () => (
    <Box maxW="800px" mx="auto" p={6} bg={colors.cardBg} borderRadius="md" boxShadow="0 1px 4px rgba(0,0,0,0.08)">
      <Stack spacing={6}>
        <Box>
          <Heading as="h1" size="xl" mb={4} color={colors.text}>{lesson.title}</Heading>
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
  );

  const renderCustomView = () => (
    <Box maxW="800px" mx="auto" p={6} bg={colors.cardBg} borderRadius="md" boxShadow="0 1px 4px rgba(0,0,0,0.08)">
      {lesson.content && lesson.content.trim() !== '' ? (
        <Box
          className="custom-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: lesson.content }}
          sx={{
            // Typography
            lineHeight: '1.6',
            fontFamily: 'inherit',
            color: colors.text,
            // Headings
            '& h1': {
              fontSize: '2xl',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: colors.text,
            },
            '& h2': {
              fontSize: 'xl',
              fontWeight: 'semibold',
              marginBottom: '0.75rem',
              marginTop: '1.5rem',
              color: colors.text,
            },
            '& h3': {
              fontSize: 'lg',
              fontWeight: 'semibold',
              marginBottom: '0.5rem',
              marginTop: '1rem',
              color: colors.text,
            },
            '& h4, & h5, & h6': {
              fontSize: 'md',
              fontWeight: 'semibold',
              marginBottom: '0.5rem',
              marginTop: '0.75rem',
              color: colors.text,
            },
            // Paragraphs
            '& p': {
              marginBottom: '1rem',
              color: colors.text,
            },
            // Lists
            '& ul, & ol': {
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
              color: colors.text,
            },
            '& li': {
              marginBottom: '0.25rem',
              color: colors.text,
            },
            // Links
            '& a': {
              color: 'blue.500',
              textDecoration: 'underline',
              '&:hover': {
                color: 'blue.600',
              },
            },
            // Code
            '& code': {
              backgroundColor: colors.inputBg || 'gray.100',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: 'sm',
              fontFamily: 'mono',
              color: colors.text,
            },
            '& pre': {
              backgroundColor: colors.inputBg || 'gray.100',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              marginBottom: '1rem',
              '& code': {
                backgroundColor: 'transparent',
                padding: 0,
              },
            },
            // Tables
            '& table': {
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '1rem',
            },
            '& th, & td': {
              border: `1px solid ${colors.inputBg || '#e2e8f0'}`,
              padding: '0.5rem',
              textAlign: 'left',
              color: colors.text,
            },
            '& th': {
              backgroundColor: colors.inputBg || 'gray.50',
              fontWeight: 'semibold',
            },
            // Blockquotes
            '& blockquote': {
              borderLeft: `4px solid ${colors.inputBg || '#e2e8f0'}`,
              paddingLeft: '1rem',
              marginLeft: 0,
              marginBottom: '1rem',
              fontStyle: 'italic',
              color: colors.text,
            },
            // Images
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
            },
            // Strong and emphasis
            '& strong, & b': {
              fontWeight: 'bold',
              color: colors.text,
            },
            '& em, & i': {
              fontStyle: 'italic',
              color: colors.text,
            },
          }}
        />
      ) : (
        <Text color={colors.text} fontStyle="italic">
          This lesson doesn&apos;t have custom content. Switch to template view to see the structured content.
        </Text>
      )}
    </Box>
  );

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
          <Flex justify="space-between" align="center" mb={4}>
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
            </TabList>
            {/* View Toggle - positioned at top right */}
            <FormControl display="flex" alignItems="center" maxW="300px">
              <FormLabel htmlFor="view-toggle" mb="0" color={colors.text} mr={3} fontSize="sm">
                Template View
              </FormLabel>
              <Switch
                id="view-toggle"
                isChecked={isCustomView}
                onChange={(e) => setIsCustomView(e.target.checked)}
                colorScheme="blue"
                size="md"
              />
              <FormLabel htmlFor="view-toggle" mb="0" color={colors.text} ml={3} fontSize="sm">
                Custom View
              </FormLabel>
            </FormControl>
          </Flex>
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

          <TabPanels
            bg={colors.background}
            borderRadius="xl"
            p={6}
            overflow="hidden"
          >
            <TabPanel>
              {/* Conditional rendering based on view toggle */}
              {isCustomView ? renderCustomView() : renderTemplateView()}
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
