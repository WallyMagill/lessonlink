import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Flex, Stack, Input, Tabs, TabList, TabPanels, TabPanel, Tab,
  Heading, List, ListItem, OrderedList, IconButton, Select, Text,
  Button, Textarea, Switch,
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

  const lesson = useStore(({ lessonSlice }) => lessonSlice.current);
  const fetchLesson = useStore(({ lessonSlice }) => lessonSlice.fetchLesson);
  const updateLesson = useStore(({ lessonSlice }) => lessonSlice.updateLesson);
  const deleteLesson = useStore(({ lessonSlice }) => lessonSlice.deleteLesson);
  const shareLesson = useStore(({ lessonSlice }) => lessonSlice.shareLesson);

  useEffect(() => {
    // use a wrapper so can catch failed promises
    const wrapper = async () => {
      try {
        await fetchLesson(id);
      } catch (error) {
        console.error('failed to retrieve post', error);
      }
    };
    wrapper();
  }, []);

  useEffect(() => {
    if (lesson) {
      setEditedLesson({
        ...lesson,
        materials: lesson.materials || [],
        steps: lesson.steps || [],
      });
    }
  }, [lesson]);

  const handleSave = async () => {
    try {
      await updateLesson(id, editedLesson);
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
    setEditedLesson((prev) => ({
      ...prev,
      [field]: value,
    }));
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
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>View Standards</Tab>
            <Tab>Template</Tab>
            <Tab>Custom</Tab>
          </TabList>
          <TabPanels>
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
            <TabPanel><Text>Template content goes here.</Text></TabPanel>
            <TabPanel>
              <SimpleEditor
                initialContent={editedLesson?.content || ''}
                onChange={(html) => handleChange('content', html)}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default LessonEditorPage;
