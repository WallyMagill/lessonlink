import React from 'react';
import {
  Box, Flex, Stack, Input, Tabs, TabList, TabPanels, TabPanel, Tab,
  Heading, List, ListItem, OrderedList, IconButton, Select, Text,
} from '@chakra-ui/react';
import { FaPrint, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import Header from '../components/Header';

function LessonEditorPage() {
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
                    <Select placeholder="Filter by Subject">
                      <option>Science</option>
                      <option>Math</option>
                      <option>English</option>
                    </Select>
                    <Select placeholder="Filter by Grade">
                      <option>K-5</option>
                      <option>6-8</option>
                      <option>9-12</option>
                    </Select>
                    <Select placeholder="Filter by Topic">
                      <option>Biology</option>
                      <option>Chemistry</option>
                      <option>Physics</option>
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
                      <Heading as="h2" size="lg" mb={2}>My Lesson</Heading>
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
                        <ListItem>Worksheet</ListItem>
                        <ListItem>Textbook</ListItem>
                        <ListItem>Blank paper</ListItem>
                        <ListItem>Goggles</ListItem>
                        <ListItem>Beaker</ListItem>
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
                      <List spacing={1} styleType="disc" pl={4}>
                        <ListItem>Students will be able to define key scientific terms with 80% accuracy.</ListItem>
                        <ListItem>Students will be able to design and conduct a simple scientific experiment.</ListItem>
                        <ListItem>Students will be able to explain how scientific principles relate to everyday life.</ListItem>
                      </List>
                    </Box>
                    <Box
                      bg="white"
                      p={6}
                      borderRadius="md"
                      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
                      mb={4}
                    >
                      <Heading as="h3" size="md" mb={2}>Overview</Heading>
                      <Text>In this lesson...</Text>
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
                        <ListItem>Hand out the worksheet and go over the objective of the...</ListItem>
                        <ListItem>Open the textbook to page 123...</ListItem>
                        <ListItem>Talk with partner about ...</ListItem>
                      </OrderedList>
                    </Box>
                    <Flex gap={4} mt={2}>
                      <IconButton icon={<FaPrint />} aria-label="Print" />
                      <IconButton icon={<FaFileAlt />} aria-label="Save as File" />
                      <IconButton icon={<FaExternalLinkAlt />} aria-label="Share" />
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
