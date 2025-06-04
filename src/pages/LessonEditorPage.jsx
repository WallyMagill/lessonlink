import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Stack,
  Input,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  // Select,
  // Switch,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Heading,
  List,
  ListItem,
  OrderedList,
  IconButton,
  Text,
  Button,
  Textarea,
  useToast, // Switch,
} from '@chakra-ui/react';
import { FaFileAlt, FaTrash } from 'react-icons/fa';

import Header from '../components/Header';
import useStore from '../store';
import PrintPage from '../components/printpage';
// import EmailPage from '../components/sharepage';
import { SimpleEditor } from '../components/tiptap-templates/simple/simple-editor';

// Import SCSS files for tiptap styling
import '../styles/_variables.scss';
import '../styles/_keyframe-animations.scss';
import ShareButton from '../components/sharepage';
import { useTheme } from '../components/ThemeContext';
import StandardsPanel from '../components/StandardsPanel';

function LessonEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedLesson, setEditedLesson] = useState(null);
  const [sharedUser, setSharedUser] = useState('');
  const [hasUsedCustomView, setHasUsedCustomView] = useState(false);
  const { isOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [showStandards, setShowStandards] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = parseInt(searchParams.get('tab'), 10);
  const [tabIndex, setTabIndex] = useState(
    Number.isNaN(tabParam) ? 0 : tabParam,
  );
  const toast = useToast();
  const lesson = useStore(({ lessonSlice }) => lessonSlice.current);
  const fetchLesson = useStore(({ lessonSlice }) => lessonSlice.fetchLesson);
  const updateLesson = useStore(({ lessonSlice }) => lessonSlice.updateLesson);
  const deleteLesson = useStore(({ lessonSlice }) => lessonSlice.deleteLesson);
  const shareLesson = useStore(({ lessonSlice }) => lessonSlice.shareLesson);
  const { colors, isDarkMode } = useTheme();

  const standards = useStore(({ standardSlice }) => standardSlice.standards);
  const selectedStandards = useStore(
    ({ lessonSlice }) => lessonSlice.selectedStandards,
  );
  const setSelectedStandards = useStore(
    ({ lessonSlice }) => lessonSlice.setSelectedStandards,
  );

  const convertLessonToHTML = (lessonData) => {
    const materials = lessonData.materials
      ?.filter((m) => m.content && m.content.trim())
      .map((m) => `<li>${m.content}</li>`)
      .join('') || '';

    const steps = lessonData.steps
      ?.filter((s) => s.content && s.content.trim())
      .map((s) => `<li>${s.content}</li>`)
      .join('') || '';

    return `
      <h1>${lessonData.title || 'Untitled Lesson'}</h1>

      ${
  lessonData.subject ? `<h2>Subject</h2><p>${lessonData.subject}</p>` : ''
}

      ${
  lessonData.grade ? `<h2>Grade</h2><p>Grade ${lessonData.grade}</p>` : ''
}

      ${
  lessonData.objectives
    ? `<h2>Learning Objectives</h2><p>${lessonData.objectives}</p>`
    : ''
}

      ${
  lessonData.overview
    ? `<h2>Overview</h2><p>${lessonData.overview}</p>`
    : ''
}

      ${materials ? `<h2>Materials</h2><ul>${materials}</ul>` : ''}

      ${steps ? `<h2>Procedure</h2><ol>${steps}</ol>` : ''}
    `.trim();
  };

  useEffect(() => {
    // use a wrapper so can catch failed promises
    const wrapper = async () => {
      try {
        console.log('Fetching lesson with id:', id);
        await fetchLesson(id);
      } catch (error) {
        console.error('failed to retrieve post', error);
      }
    };
    wrapper();
  }, []);

  useEffect(() => {
    if (lesson) {
      const initialLesson = {
        ...lesson,
        materials: (lesson.materials || []).map((material) => ({
          id: `material-${Date.now()}-${Math.random()}`,
          content: material,
        })),
        steps: (lesson.steps || []).map((step) => ({
          id: `step-${Date.now()}-${Math.random()}`,
          content: step,
        })),
        content: lesson.content || '',
      };
      console.log('Setting edited lesson:', initialLesson);
      setEditedLesson(initialLesson);

      if (lesson.content && lesson.content.trim() !== '') {
        console.log('Lesson has existing content, marking as used custom view');
        setHasUsedCustomView(true);
      }

      setSelectedStandards(lesson.standards || []);
    } else {
      setSelectedStandards([]);
    }
  }, [lesson]);

  useEffect(() => {
    setTabIndex(Number.isNaN(tabParam) ? 0 : tabParam);
  }, [tabParam]);

  const handleSave = async () => {
    try {
      console.log('Saving lesson with data:', editedLesson);
      console.log('Content being saved:', editedLesson.content);

      const extractTitleFromContent = (htmlContent) => {
        if (!htmlContent || htmlContent.trim() === '') return editedLesson.title;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const h1 = tempDiv.querySelector('h1');
        if (h1 && h1.textContent.trim()) {
          return h1.textContent.trim();
        }
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        const firstLine = textContent.split('\n')[0].trim();
        if (firstLine && firstLine.length > 0 && firstLine.length <= 100) {
          return firstLine;
        }
        return editedLesson.title || 'Untitled Lesson';
      };

      const extractedTitle = extractTitleFromContent(editedLesson.content);
      console.log('Extracted title from content:', extractedTitle);

      const lessonToSave = {
        ...editedLesson,
        title: extractedTitle,
        materials: editedLesson.materials.map((m) => m.content),
        steps: editedLesson.steps.map((s) => s.content),
        standards: selectedStandards || [],
      };

      await updateLesson(id, lessonToSave);

      toast({
        title: 'Success!',
        description:
          'All changes have been saved. You can now safely navigate away from the editor.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save lesson:', err);
      toast({
        title: 'Error',
        description: 'Something went wrong while saving. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLesson(id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleConfirmCustomView = () => {
    // Convert current lesson data to HTML and populate content
    const htmlContent = convertLessonToHTML(editedLesson);
    setEditedLesson((prev) => ({
      ...prev,
      content: htmlContent,
    }));
    setHasUsedCustomView(true);
    setTabIndex(2);
    setSearchParams({ tab: 2 });
    onClose();
  };

  const handleChange = (field, value) => {
    console.log(`handleChange called with field: ${field}, value:`, value);
    console.log('Current editedLesson state:', editedLesson);
    const updatedLesson = {
      ...editedLesson,
      [field]: value,
    };

    // If we're updating content directly (from custom view), just use the provided value
    if (field === 'content') {
      console.log('Direct content update detected. New content:', value);
      setEditedLesson(updatedLesson);
      console.log('Updated lesson after content change:', updatedLesson);
      return;
    }

    // If we're in template view and haven't used custom view, auto-generate content
    if (tabIndex === 0 && !hasUsedCustomView) {
      const htmlContent = convertLessonToHTML(updatedLesson);
      console.log('Generated HTML content in template view:', htmlContent);
      updatedLesson.content = htmlContent;
    }

    console.log('Final updatedLesson before setState:', updatedLesson);
    setEditedLesson(updatedLesson);
  };

  const handleAddShared = async () => {
    if (!sharedUser.trim()) return;
    try {
      await shareLesson(id, sharedUser);
      // Clear input
      setSharedUser('');
    } catch (error) {
      console.error('Failed to add shared user:', error);
    }
  };

  // Add logging to SimpleEditor onChange
  const handleEditorChange = (html) => {
    console.log('SimpleEditor onChange called with html:', html);
    handleChange('content', html);
  };

  if (!lesson) {
    return <Text>Loading lesson...</Text>;
  }
  const handleAddMaterial = () => {
    const newId = `material-${Date.now()}`;
    setEditedLesson((prev) => ({
      ...prev,
      materials: [...(prev.materials || []), { id: newId, content: '' }],
    }));
  };

  const handleAddStep = () => {
    const newId = `step-${Date.now()}`;
    setEditedLesson((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), { id: newId, content: '' }],
    }));
  };
  if (!lesson || !editedLesson) {
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
        <Flex flex="1" align="center" justify="center">
          <Text color={colors.text}>Loading lesson...</Text>
        </Flex>
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
      <Box p={6} flex="1" overflowY="auto">
        <Tabs
          variant="enclosed"
          colorScheme="blue"
          index={tabIndex}
          onChange={(index) => {
            setTabIndex(index);
            setSearchParams({ tab: index });
          }}
        >
          <TabList>
            <Tab color={colors.text}>View</Tab>
            <Tab color={colors.text}>Edit</Tab>
            <Tab color={colors.text}>Custom</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                maxW="800px"
                mx="auto"
                p={6}
                bg={colors.cardBg}
                borderRadius="md"
                boxShadow="0 1px 4px rgba(0,0,0,0.08)"
              >
                <Stack spacing={6}>
                  <Box>
                    <Heading as="h1" size="xl" mb={4} color={colors.text}>
                      {lesson.title}
                    </Heading>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>
                      Materials
                    </Heading>
                    <List spacing={2} styleType="disc" pl={4}>
                      {lesson.materials?.map((material) => (
                        <ListItem
                          key={`material-${material}`}
                          color={colors.text}
                        >
                          {material}
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>
                      Learning Objectives
                    </Heading>
                    <Text whiteSpace="pre-wrap" color={colors.text}>
                      {lesson.objectives}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>
                      Overview
                    </Heading>
                    <Text whiteSpace="pre-wrap" color={colors.text}>
                      {lesson.overview}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h2" size="md" mb={2} color={colors.text}>
                      Procedure
                    </Heading>
                    <OrderedList spacing={2} pl={4}>
                      {lesson.steps?.map((step) => (
                        <ListItem key={`step-${step}`} color={colors.text}>
                          {step}
                        </ListItem>
                      ))}
                    </OrderedList>
                  </Box>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel p={0} mt={4}>
              <Flex gap={6}>
                {showStandards && (
                  <StandardsPanel standards={standards} colors={colors} />
                )}
                <Box flex={1}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Button
                      size="sm"
                      onClick={() => setShowStandards(!showStandards)}
                      leftIcon={<FaFileAlt />}
                      color={isDarkMode ? 'white' : colors.text}
                      colorScheme={isDarkMode ? 'blue' : undefined}
                    >
                      {showStandards ? 'Hide Standards' : 'Show Standards'}
                    </Button>
                  </Flex>
                  <Stack spacing={4}>
                    <Box
                      bg={colors.cardBg}
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Input
                        value={editedLesson.title || ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                        fontSize="2xl"
                        fontWeight="bold"
                        mb={2}
                        placeholder="Lesson Title"
                        bg={colors.inputBg}
                        color={colors.text}
                      />
                    </Box>
                    <Box
                      bg={colors.cardBg}
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2} color={colors.text}>
                        Materials:
                      </Heading>
                      <List
                        spacing={1}
                        styleType="disc"
                        pl={4}
                        sx={
                          isDarkMode ? { 'li::marker': { color: 'white' } } : {}
                        }
                      >
                        {(editedLesson?.materials || []).map((material) => (
                          <ListItem key={material.id}>
                            <Input
                              value={material.content || ''}
                              onChange={(e) => {
                                const newMaterials = editedLesson.materials.map(
                                  (m) => (m.id === material.id
                                    ? { ...m, content: e.target.value }
                                    : m),
                                );
                                setEditedLesson((prev) => ({
                                  ...prev,
                                  materials: newMaterials,
                                }));
                              }}
                              bg={colors.inputBg}
                              color={colors.text}
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <Button
                            size="sm"
                            onClick={handleAddMaterial}
                            color={isDarkMode ? 'white' : colors.text}
                            colorScheme={isDarkMode ? 'blue' : undefined}
                          >
                            Add Material
                          </Button>
                        </ListItem>
                      </List>
                    </Box>
                    <Box
                      bg={colors.cardBg}
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2} color={colors.text}>
                        Learning Objectives
                      </Heading>
                      <Textarea
                        value={editedLesson.objectives}
                        onChange={(e) => handleChange('objectives', e.target.value)}
                        placeholder="Enter learning objectives..."
                        bg={colors.inputBg}
                        color={colors.text}
                      />
                    </Box>
                    <Box
                      bg={colors.cardBg}
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2} color={colors.text}>
                        Overview
                      </Heading>
                      <Textarea
                        value={editedLesson.overview}
                        onChange={(e) => handleChange('overview', e.target.value)}
                        placeholder="Enter lesson overview..."
                        bg={colors.inputBg}
                        color={colors.text}
                      />
                    </Box>
                    <Box
                      bg={colors.cardBg}
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2} color={colors.text}>
                        Procedure List
                      </Heading>
                      <OrderedList
                        spacing={1}
                        pl={4}
                        sx={
                          isDarkMode ? { 'li::marker': { color: 'white' } } : {}
                        }
                      >
                        {(editedLesson?.steps || []).map((step) => (
                          <ListItem key={step.id}>
                            <Input
                              value={step.content || ''}
                              onChange={(e) => {
                                const newSteps = editedLesson.steps.map((s) => (s.id === step.id
                                  ? { ...s, content: e.target.value }
                                  : s));
                                setEditedLesson((prev) => ({
                                  ...prev,
                                  steps: newSteps,
                                }));
                              }}
                              bg={colors.inputBg}
                              color={colors.text}
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <Button
                            size="sm"
                            onClick={handleAddStep}
                            color={isDarkMode ? 'white' : colors.text}
                            colorScheme={isDarkMode ? 'blue' : undefined}
                          >
                            Add Step
                          </Button>
                        </ListItem>
                      </OrderedList>
                    </Box>
                    {/* HTML Preview Section */}
                    <Box
                      bg="white"
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={4}>
                        Lesson Preview
                      </Heading>
                      <Box
                        border="1px solid #e2e8f0"
                        borderRadius="md"
                        p={4}
                        bg="#f7fafc"
                        maxH="400px"
                        overflowY="auto"
                      >
                        <div
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html:
                              editedLesson.content || '<p>No content yet</p>',
                          }}
                          style={{
                            lineHeight: '1.6',
                            fontFamily: 'inherit',
                          }}
                        />
                      </Box>
                    </Box>

                    <Flex gap={4} mt={2}>
                      <PrintPage isDarkMode={isDarkMode} />
                      <IconButton
                        icon={<FaTrash />}
                        type="submit"
                        onClick={handleDelete}
                        aria-label="Delete Lesson"
                        color={isDarkMode ? 'white' : colors.text}
                        colorScheme={isDarkMode ? 'blue' : undefined}
                      />
                      <ShareButton
                        lesson={editedLesson}
                        updateLesson={handleChange}
                        shareLesson={handleAddShared}
                      />

                      <Button colorScheme="blue" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </Flex>
                  </Stack>
                </Box>
              </Flex>
            </TabPanel>
            {/* Custom View */}
            <TabPanel>
              <Box mb={4}>
                {hasUsedCustomView && (
                  <Box bg="yellow.100" p={3} borderRadius="md" mb={4}>
                    <Text fontSize="sm" color="yellow.800">
                      ⚠️ You are in custom view. Changes made here will not be
                      reflected in the template view.
                    </Text>
                  </Box>
                )}
                <SimpleEditor
                  initialContent={editedLesson?.content || ''}
                  onChange={handleEditorChange}
                />
              </Box>
              <Flex gap={4} justify="flex-end">
                <Button colorScheme="blue" onClick={handleSave}>
                  Save Changes
                </Button>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Warning Dialog */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Switch to Custom View
              </AlertDialogHeader>

              <AlertDialogBody>
                Switching to custom view will convert your structured lesson
                data into a rich text format. Changes made in custom view will
                not be reflected back in the template view. Do you want to
                continue?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={handleConfirmCustomView}
                  ml={3}
                >
                  Continue to Custom View
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Box>
  );
}

export default LessonEditorPage;
