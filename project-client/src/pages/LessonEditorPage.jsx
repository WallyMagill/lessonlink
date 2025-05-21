import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Flex, Stack, Input, Tabs, TabList, TabPanels, TabPanel, Tab,
  Heading, List, ListItem, OrderedList, IconButton, Select, Text,
  Button, Textarea,
} from '@chakra-ui/react';
import { FaPrint, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import Header from '../components/Header';
import useStore from '../store';
import useLessonHandlers from '../handlers/lessonHandlers';

function LessonEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = useStore();
  const { handleUpdateLesson } = useLessonHandlers();
  const [editedLesson, setEditedLesson] = useState(null);

  useEffect(() => {
    if (id) {
      store.fetchLesson(id);
    }
  }, [id]);

  useEffect(() => {
    if (store.current) {
      setEditedLesson(store.current);
    }
  }, [store.current]);

  const handleSave = async () => {
    try {
      await handleUpdateLesson(id, editedLesson);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handleChange = (field, value) => {
    setEditedLesson((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (store.loading) {
    return <Text>Loading lesson...</Text>;
  }

  if (!editedLesson) {
    return <Text>Lesson not found</Text>;
  }

  return (
    <Box
      width="100vw"
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
                        value={editedLesson.title}
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
                        {editedLesson.materials.map((material) => (
                          <ListItem key={`material-${material}`}>
                            <Input
                              value={material}
                              onChange={(e) => {
                                const newMaterials = [...editedLesson.materials];
                                newMaterials[editedLesson.materials.indexOf(material)] = e.target.value;
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
                        {editedLesson.steps.map((step) => (
                          <ListItem key={`step-${step}`}>
                            <Input
                              value={step}
                              onChange={(e) => {
                                const newSteps = [...editedLesson.steps];
                                newSteps[editedLesson.steps.indexOf(step)] = e.target.value;
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
                      <IconButton icon={<FaPrint />} aria-label="Print" />
                      <IconButton icon={<FaFileAlt />} aria-label="Save as File" />
                      <IconButton icon={<FaExternalLinkAlt />} aria-label="Share" />
                      <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
                    </Flex>
                  </Stack>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel><Text>Template content goes here.</Text></TabPanel>
            <TabPanel><Text>Custom content goes here.</Text></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default LessonEditorPage;
