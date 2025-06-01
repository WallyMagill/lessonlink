// Citation: this component was made with the use of Generative A.I.
import React, { useState, useMemo } from 'react';
import {
  Box,
  Stack,
  Select,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import useLessonStore from '../store/index'; // or your actual store import path

function RecursiveAccordion({ data, toggleStandardSelection, selectedCodes }) {
  if (Array.isArray(data)) {
    return (
      <Stack spacing={2} pl={4} pt={2}>
        {data.map((standard) => {
          const isSelected = selectedCodes.includes(standard.standardCode);
          return (
            <Box
              key={standard.standardCode || standard.description}
              p={2}
              bg={isSelected ? 'blue.100' : 'blue.50'}
              borderRadius="md"
              fontSize="sm"
              _hover={{ bg: 'blue.200' }}
              cursor="pointer"
              onClick={() => toggleStandardSelection(standard)}
              border={isSelected ? '2px solid' : '1px solid'}
              borderColor={isSelected ? 'blue.400' : 'gray.200'}
              mb={2}
            >
              <Text color="gray.800">{standard.description}</Text>
              {standard.standardCode && (
                <Text fontSize="xs" color="blue.600">
                  {standard.standardCode}
                </Text>
              )}
            </Box>
          );
        })}
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {Object.entries(data).map(([key, value]) => (
        <Accordion key={key} allowToggle border="none" borderRadius="lg">
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                bg="blue.100"
                _hover={{ bg: 'blue.200' }}
                borderRadius="md"
                px={3}
                py={2}
              >
                <Box flex="1" textAlign="left" fontWeight="semibold" color="blue.800">
                  {key}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px={2} py={2} bg="blue.50" borderRadius="md" mt={2}>
              <RecursiveAccordion
                data={value}
                toggleStandardSelection={toggleStandardSelection}
                selectedCodes={selectedCodes}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Stack>
  );
}

function StandardsPanel({ standards }) {
  const selectedStandards = useLessonStore((s) => s.lessonSlice.selectedStandards);
  const toggleStandard = useLessonStore((s) => s.lessonSlice.toggleStandard);

  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');

  const selectedCodes = selectedStandards.map((s) => s.standardCode);

  const filteredStandards = useMemo(() => {
    return standards.filter((standard) => {
      const matchesSubject = subjectFilter ? standard.subject === subjectFilter : true;
      const matchesGrade = gradeFilter ? String(standard.grade) === String(gradeFilter) : true;
      return matchesSubject && matchesGrade;
    });
  }, [standards, subjectFilter, gradeFilter]);

  const groupedStandards = useMemo(() => {
    return filteredStandards.reduce((acc, s) => {
      acc[s.subject] ??= {};
      acc[s.subject][s.grade] ??= {};
      acc[s.subject][s.grade][s.domain] ??= {};
      acc[s.subject][s.grade][s.domain][s.anchorStandard] ??= [];
      acc[s.subject][s.grade][s.domain][s.anchorStandard].push(s);
      return acc;
    }, {});
  }, [filteredStandards]);

  return (
    <Box
      width="100%"
      maxW="400px"
      bg="white"
      p={4}
      boxShadow="lg"
      borderRadius="xl"
      overflowY="auto"
      maxHeight="calc(100vh - 100px)"
      border="1px solid"
      borderColor="gray.200"
    >
      <Box mb={4}>
        {selectedCodes.length === 0 ? (
          <Text color="blue.600" fontSize="sm">
            No standards selected
          </Text>
        ) : (
          <Stack spacing={2} direction="row" wrap="wrap">
            {selectedCodes.map((code) => (
              <Tag
                size="md"
                key={code}
                borderRadius="full"
                variant="solid"
                bg="blue.400"
                color="white"
              >
                <TagLabel>{code}</TagLabel>
                <TagCloseButton
                  onClick={() => toggleStandard(selectedStandards.find((s) => s.standardCode === code))}
                />
              </Tag>
            ))}
          </Stack>
        )}
      </Box>

      <Stack spacing={3} mb={4}>
        <Select
          placeholder="Filter by Subject"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          bg="blue.50"
          color="blue.800"
          fontWeight="medium"
        >
          <option value="Math">Math</option>
          <option value="ELA-Literacy">ELA</option>
        </Select>

        <Select
          placeholder="Filter by Grade"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          bg="blue.50"
          color="blue.800"
          fontWeight="medium"
        >
          <option value="Kindergarten">Kindergarten</option>
          {[...Array(8).keys()].map((g) => {
            const gradeStr = `Grade ${g + 1}`;
            return (
              <option key={gradeStr} value={gradeStr}>
                {gradeStr}
              </option>
            );
          })}
        </Select>
      </Stack>

      {filteredStandards.length === 0 ? (
        <Text mt={6} color="gray.500" fontStyle="italic" textAlign="center">
          No standards found.
        </Text>
      ) : (
        <RecursiveAccordion
          data={groupedStandards}
          toggleStandardSelection={toggleStandard}
          selectedCodes={selectedCodes}
        />
      )}
    </Box>
  );
}

export default React.memo(StandardsPanel);
