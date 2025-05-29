import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
import { useTheme } from '../components/ThemeContext';

function LessonEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedLesson, setEditedLesson] = useState(null);
  const [sharedUser, setSharedUser] = useState('');
  const [showStandards, setShowStandards] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = parseInt(searchParams.get('tab'), 10);
  const [tabIndex, setTabIndex] = useState(Number.isNaN(tabParam) ? 0 : tabParam);

  const lesson = useStore(({ lessonSlice }) => lessonSlice.current);
  const fetchLesson = useStore(({ lessonSlice }) => lessonSlice.fetchLesson);
  const updateLesson = useStore(({ lessonSlice }) => lessonSlice.updateLesson);
  const deleteLesson = useStore(({ lessonSlice }) => lessonSlice.deleteLesson);
  const shareLesson = useStore(({ lessonSlice }) => lessonSlice.shareLesson);
  const standards = useStore(({ standardSlice }) => standardSlice.standards);

  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { colors } = useTheme();

  const filteredStandards = standards.filter((s) => {
    return (!subjectFilter || s.subject === subjectFilter)
         && (!gradeFilter || s.grade.toString() === gradeFilter);
  });
  const visibleStandards = filteredStandards.filter((s) => s.description.toLowerCase().includes(searchTerm.toLowerCase()));

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

  useEffect(() => {
    setTabIndex(Number.isNaN(tabParam) ? 0 : tabParam);
  }, [tabParam]);

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
      height="100vh"
      display="flex"
      flexDirection="column"
      bg={colors.background}
      fontFamily="var(--chakra-fonts-body, Arial, sans-serif)"
      overflow="hidden"
    >
      <Header />
      <Box
        flex="1"
        overflowY="auto"
        p={6}
      >
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
            <Tab color={colors.text}>Edit</Tab>
            <Tab color={colors.text}>View</Tab>
            <Tab color={colors.text}>Custom</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0} mt={4}>
              <Flex gap={6}>
                {showStandards && (
                  <Box
                    width="250px"
                    maxH="100vh"
                    overflowY="auto"
                    bg={colors.cardBg}
                    p={4}
                    boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                    borderRadius="md"
                  >
                    <Input
                      placeholder="Search Standards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      mb={4}
                      bg={colors.inputBg}
                      color={colors.text}
                    />
                    <Stack spacing={3}>
                      <Select
                        placeholder="Filter by Subject"
                        value={editedLesson.subject}
                        onChange={(e) => setSubjectFilter(e.target.value)}
                        bg={colors.inputBg}
                        color={colors.text}
                      >
                        <option>Science</option>
                        <option>Math</option>
                        <option>English</option>
                      </Select>
                      <Select
                        placeholder="Filter by Grade"
                        value={editedLesson.grade}
                        onChange={(e) => setGradeFilter(parseInt(e.target.value, 10))}
                        bg={colors.inputBg}
                        color={colors.text}
                      >
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                        <option value="6">Grade 6</option>
                      </Select>
                      {Object.entries(
                        visibleStandards.reduce((acc, s) => {
                          acc[s.anchorStandard] = acc[s.anchorStandard] || [];
                          acc[s.anchorStandard].push(s);
                          return acc;
                        }, {}),
                      ).map(([anchor, group]) => (
                        <Box key={anchor}>
                          <Text fontWeight="bold" mt={4} color={colors.text}>{anchor}</Text>
                          <Stack spacing={1} pl={2}>
                            {group.map((standard) => (
                              <Box
                                key={standard.standardCode}
                                p={2}
                                bg={colors.hover}
                                borderRadius="md"
                                fontSize="sm"
                                _hover={{ bg: colors.border }}
                                color={colors.text}
                              >
                                {standard.description}
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
                <Box flex={1}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Button
                      size="sm"
                      onClick={() => setShowStandards(!showStandards)}
                      leftIcon={<FaFileAlt />}
                      color={colors.text}
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
                      <Heading as="h3" size="md" mb={2} color={colors.text}>Materials:</Heading>
                      <List spacing={1} styleType="disc" pl={4}>
                        {(editedLesson?.materials || []).map((material) => (
                          <ListItem key={`material-${material}-${Date.now()}`}>
                            <Input
                              value={material || ''}
                              onChange={(e) => {
                                const newMaterials = [...editedLesson.materials];
                                const index = newMaterials.findIndex((m) => m === material);
                                newMaterials[index] = e.target.value;
                                handleChange('materials', newMaterials);
                              }}
                              bg={colors.inputBg}
                              color={colors.text}
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <Button
                            size="sm"
                            onClick={() => handleChange('materials', [...editedLesson.materials, ''])}
                            color={colors.text}
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
                      <Heading as="h3" size="md" mb={2} color={colors.text}>Learning Objectives</Heading>
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
                      <Heading as="h3" size="md" mb={2} color={colors.text}>Overview</Heading>
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
                      <Heading as="h3" size="md" mb={2} color={colors.text}>Procedure List</Heading>
                      <OrderedList spacing={1} pl={4}>
                        {(editedLesson?.steps || []).map((step) => (
                          <ListItem key={`step-${step}-${Date.now()}`}>
                            <Input
                              value={step || ''}
                              onChange={(e) => {
                                const newSteps = [...editedLesson.steps];
                                const index = newSteps.findIndex((s) => s === step);
                                newSteps[index] = e.target.value;
                                handleChange('steps', newSteps);
                              }}
                              bg={colors.inputBg}
                              color={colors.text}
                            />
                          </ListItem>
                        ))}
                        <ListItem>
                          <Button
                            size="sm"
                            onClick={() => handleChange('steps', [...editedLesson.steps, ''])}
                            color={colors.text}
                          >
                            Add Step
                          </Button>
                        </ListItem>
                      </OrderedList>
                    </Box>
                    <Flex gap={4} mt={2}>
                      <PrintPage />
                      <EmailPage />
                      <Button onClick={handleDelete} colorScheme="red">Delete Lesson</Button>
                      <Flex alignItems="center" gap={2}>
                        <Text color={colors.text}>
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
                        bg={colors.inputBg}
                        color={colors.text}
                      />
                      <Button onClick={handleAddShared} colorScheme="blue" mb={4}>Share</Button>
                      <IconButton icon={<FaFileAlt />} aria-label="Save as File" color={colors.text} />
                      <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
                    </Flex>
                  </Stack>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Box maxW="800px" mx="auto" p={6}>
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
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: colors.text }}>New Feature Coming Soon!</p>
                <img
                  src="https://s4.ad.brown.edu/Projects/UTP2/under-construction-yom.png"
                  alt="Page under construction"
                  style={{ maxWidth: '100%', height: 'auto', justifySelf: 'center' }}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default LessonEditorPage;
