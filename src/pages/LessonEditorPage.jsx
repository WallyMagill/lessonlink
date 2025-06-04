import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Flex, Stack, Input, Tabs, TabList, TabPanels, TabPanel, Tab,
  Heading, List, ListItem, OrderedList, IconButton, Select, Text,
  Button, Textarea, Switch, AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure,
} from '@chakra-ui/react';
import { FaFileAlt } from 'react-icons/fa';
import Header from '../components/Header';
import useStore from '../store';
import PrintPage from '../components/printpage';
import EmailPage from '../components/sharepage';
import { SimpleEditor } from '../components/tiptap-templates/simple/simple-editor';

// Import SCSS files for tiptap styling
import '../styles/_variables.scss';
import '../styles/_keyframe-animations.scss';

function LessonEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedLesson, setEditedLesson] = useState(null);
  const [sharedUser, setSharedUser] = useState('');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [hasUsedCustomView, setHasUsedCustomView] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const lesson = useStore(({ lessonSlice }) => lessonSlice.current);
  const fetchLesson = useStore(({ lessonSlice }) => lessonSlice.fetchLesson);
  const updateLesson = useStore(({ lessonSlice }) => lessonSlice.updateLesson);
  const deleteLesson = useStore(({ lessonSlice }) => lessonSlice.deleteLesson);
  const shareLesson = useStore(({ lessonSlice }) => lessonSlice.shareLesson);

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
      console.log('Loading lesson:', lesson);
      const initialLesson = {
        ...lesson,
        materials: lesson.materials || [],
        steps: lesson.steps || [],
        content: lesson.content || '', // Ensure content is initialized
      };
      console.log('Setting edited lesson:', initialLesson);
      setEditedLesson(initialLesson);
      // Check if lesson already has content (indicating it might have been edited in custom view)
      if (lesson.content && lesson.content.trim() !== '') {
        console.log('Lesson has existing content, marking as used custom view');
        setHasUsedCustomView(true);
      }
    }
  }, [lesson]);

  // Function to convert structured lesson data to HTML content
  const convertLessonToHTML = (lessonData) => {
    console.log('Converting lesson data to HTML:', lessonData);
    const materials = lessonData.materials?.filter((m) => m && m.trim()).map((m) => `<li>${m}</li>`).join('') || '';
    const steps = lessonData.steps?.filter((s) => s && s.trim()).map((s) => `<li>${s}</li>`).join('') || '';

    const html = `
      <h1>${lessonData.title || 'Untitled Lesson'}</h1>

      ${lessonData.subject ? `<h2>Subject</h2><p>${lessonData.subject}</p>` : ''}

      ${lessonData.grade ? `<h2>Grade</h2><p>Grade ${lessonData.grade}</p>` : ''}

      ${lessonData.objectives ? `<h2>Learning Objectives</h2><p>${lessonData.objectives}</p>` : ''}

      ${lessonData.overview ? `<h2>Overview</h2><p>${lessonData.overview}</p>` : ''}

      ${materials ? `<h2>Materials</h2><ul>${materials}</ul>` : ''}

      ${steps ? `<h2>Procedure</h2><ol>${steps}</ol>` : ''}
    `.trim();

    console.log('Generated HTML:', html);
    return html;
  };

  const handleTabChange = (index) => {
    // If switching to custom view (index 1) and haven't used it before
    if (index === 1 && !hasUsedCustomView) {
      onOpen(); // Show warning dialog
      return;
    }
    setCurrentTabIndex(index);
  };

  const handleConfirmCustomView = () => {
    // Convert current lesson data to HTML and populate content
    const htmlContent = convertLessonToHTML(editedLesson);
    setEditedLesson((prev) => ({
      ...prev,
      content: htmlContent,
    }));
    setHasUsedCustomView(true);
    setCurrentTabIndex(1);
    onClose();
  };

  const handleSave = async () => {
    try {
      console.log('Saving lesson with data:', editedLesson);
      console.log('Content being saved:', editedLesson.content);
      // Extract title from the first line of content
      const extractTitleFromContent = (htmlContent) => {
        if (!htmlContent || htmlContent.trim() === '') return editedLesson.title;
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        // Try to find first h1 tag
        const h1 = tempDiv.querySelector('h1');
        if (h1 && h1.textContent.trim()) {
          return h1.textContent.trim();
        }
        // If no h1, get the first line of text content
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        const firstLine = textContent.split('\n')[0].trim();
        // Return first line if it exists and isn't too long, otherwise keep current title
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
      };
      console.log('Final lesson data being saved:', lessonToSave);
      await updateLesson(id, lessonToSave);
      console.log('Lesson saved successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving lesson:', error);
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
    if (currentTabIndex === 0 && !hasUsedCustomView) {
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

  if (!editedLesson) {
    return <Text>Lesson not found</Text>;
  }

  return (
    <Box
      width="100%"
      minH="100vh"
      bg="#f7fafc"
      fontFamily="var(--chakra-fonts-body, Arial, sans-serif)"
      overflowX="hidden"
    >
      <Header />
      <Box p={6}>
        <Tabs variant="enclosed" colorScheme="blue" index={currentTabIndex} onChange={handleTabChange}>
          <TabList>
            <Tab>Template</Tab>
            <Tab>Custom</Tab>
          </TabList>
          <TabPanels>
            {/* Template View */}
            <TabPanel p={0} mt={4}>
              <Flex gap={6}>
                <Box
                  width="250px"
                  bg="white"
                  p={4}
                  boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                  borderRadius="md"
                >
                  <Input placeholder="Search Standards..." mb={4} />
                  <Stack spacing={3}>
                    <Select
                      placeholder="Filter by Subject"
                      value={editedLesson.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                    >
                      <option>Science</option>
                      <option>Math</option>
                      <option>English</option>
                    </Select>
                    <Select
                      placeholder="Filter by Grade"
                      value={editedLesson.grade}
                      onChange={(e) => handleChange('grade', parseInt(e.target.value, 10))}
                    >
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                    </Select>
                  </Stack>
                </Box>
                <Box flex={1}>
                  <Stack spacing={4}>
                    <Box
                      bg="white"
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
                      />
                    </Box>
                    <Box
                      bg="white"
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2}>Materials:</Heading>
                      <List spacing={1} styleType="disc" pl={4}>
                        {(editedLesson?.materials || []).map((material, index) => (
                          // !!! TODO fix this to use a proper key
                          // eslint-disable-next-line react/no-array-index-key
                          <ListItem key={`material-${index}`}>
                            <Input
                              value={material || ''}
                              onChange={(e) => {
                                const newMaterials = [...editedLesson.materials];
                                newMaterials[index] = e.target.value;
                                handleChange('materials', newMaterials);
                              }}
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <Button
                            size="sm"
                            onClick={() => handleChange('materials', [...editedLesson.materials, ''])}
                          >
                            Add Material
                          </Button>
                        </ListItem>
                      </List>
                    </Box>
                    <Box
                      bg="white"
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2}>Learning Objectives</Heading>
                      <Textarea
                        value={editedLesson.objectives}
                        onChange={(e) => handleChange('objectives', e.target.value)}
                        placeholder="Enter learning objectives..."
                      />
                    </Box>
                    <Box
                      bg="white"
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2}>Overview</Heading>
                      <Textarea
                        value={editedLesson.overview}
                        onChange={(e) => handleChange('overview', e.target.value)}
                        placeholder="Enter lesson overview..."
                      />
                    </Box>
                    <Box
                      bg="white"
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2}>Procedure List</Heading>
                      <OrderedList spacing={1} pl={4}>
                        {(editedLesson?.steps || []).map((step, index) => (
                          // !!! TODO fix this to use a proper key
                          // eslint-disable-next-line react/no-array-index-key
                          <ListItem key={`step-${index}`}>
                            <Input
                              value={step || ''}
                              onChange={(e) => {
                                const newSteps = [...editedLesson.steps];
                                newSteps[index] = e.target.value;
                                handleChange('steps', newSteps);
                              }}
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <Button
                            size="sm"
                            onClick={() => handleChange('steps', [...editedLesson.steps, ''])}
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
                      <Heading as="h3" size="md" mb={4}>Lesson Preview</Heading>
                      <Box
                        border="1px solid #e2e8f0"
                        borderRadius="md"
                        p={4}
                        bg="#f7fafc"
                        maxH="400px"
                        overflowY="auto"
                      >
                        {/* eslint-disable-next-line react/no-danger */}
                        <div
                          dangerouslySetInnerHTML={{ __html: editedLesson.content || '<p>No content yet</p>' }}
                          style={{
                            lineHeight: '1.6',
                            fontFamily: 'inherit',
                          }}
                        />
                      </Box>
                    </Box>

                    <Flex gap={4} mt={2}>
                      <PrintPage />
                      <EmailPage />
                      <button type="submit" onClick={handleDelete}>Delete Lesson</button>
                      {/* <button type="submit" onClick={() => handleChange('status', 'protected')}>Set Private</button> */}
                      <Flex alignItems="center" gap={2}>
                        <Text>
                          {editedLesson.status === 'public' ? 'Public' : 'Private'}
                        </Text>
                        <Switch
                          isChecked={editedLesson.status === 'public'}
                          onChange={() => handleChange('status', editedLesson.status === 'public' ? 'protected' : 'public')}
                        />
                      </Flex>
                      <Input
                        onChange={(e) => setSharedUser(e.target.value)}
                        mb={2}
                        placeholder="enter an email to share with"
                      />
                      <Button onClick={handleAddShared} colorScheme="blue" mb={4}>Share</Button>
                      <IconButton icon={<FaFileAlt />} aria-label="Save as File" />

                      <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
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
                      ⚠️ You are in custom view. Changes made here will not be reflected in the template view.
                    </Text>
                  </Box>
                )}
                <SimpleEditor
                  initialContent={editedLesson?.content || ''}
                  onChange={handleEditorChange}
                />
              </Box>
              <Flex gap={4} justify="flex-end">
                <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
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
                Switching to custom view will convert your structured lesson data into a rich text format.
                Changes made in custom view will not be reflected back in the template view.
                Do you want to continue?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleConfirmCustomView} ml={3}>
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
