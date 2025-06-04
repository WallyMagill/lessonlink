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
import useLessonStore from '../store/index';
import { useTheme } from './ThemeContext';

function RecursiveAccordion({
  data, toggleStandardSelection, selectedCodes, colors,
}) {
  if (Array.isArray(data)) {
    return (
      <Stack spacing={2} pl={4} pt={2}>
        {data.map((standard) => {
          const isSelected = selectedCodes.includes(standard.standardCode);
          return (
            <Box
              key={standard.standardCode || standard.description}
              p={2}
              bg={isSelected ? colors.cardBg : colors.background}
              borderRadius="md"
              fontSize="sm"
              _hover={{ bg: colors.hover }}
              cursor="pointer"
              onClick={() => toggleStandardSelection({ standardCode: standard.standardCode })}
              border={isSelected ? '2px solid' : '1px solid'}
              borderColor={isSelected ? 'blue.400' : colors.border}
              mb={2}
            >
              <Text color={colors.text}>{standard.description}</Text>
              {standard.standardCode && (
                <Text fontSize="xs" color="blue.400">
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
                bg={colors.cardBg}
                _hover={{ bg: colors.hover }}
                borderRadius="md"
                px={3}
                py={2}
              >
                <Box flex="1" textAlign="left" fontWeight="semibold" color={colors.text}>
                  {key}
                </Box>
                <AccordionIcon color={colors.text} />
              </AccordionButton>
            </h2>
            <AccordionPanel px={2} py={2} bg={colors.background} borderRadius="md" mt={2}>
              <RecursiveAccordion
                data={value}
                toggleStandardSelection={toggleStandardSelection}
                selectedCodes={selectedCodes}
                colors={colors}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Stack>
  );
}

function StandardsPanel({ standards, colors }) {
  const { isDarkMode } = useTheme();
  const optionStyle = {
    backgroundColor: isDarkMode ? '#2D3748' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  const selectedStandards = useLessonStore((s) => s.lessonSlice.selectedStandards);
  const toggleStandard = useLessonStore((s) => s.lessonSlice.toggleStandard);

  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');

  const selectedCodes = selectedStandards.filter(Boolean);

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
      bg={colors.cardBg}
      p={4}
      boxShadow="lg"
      borderRadius="xl"
      overflowY="auto"
      maxHeight="calc(100vh - 100px)"
      border="1px solid"
      borderColor={colors.border}
    >
      <Box mb={4}>
        {selectedCodes.length === 0 ? (
          <Text color={colors.text} fontSize="sm">
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
                  onClick={() => toggleStandard({ standardCode: code })}
                />
              </Tag>
            ))}
          </Stack>
        )}
      </Box>

      <Stack spacing={3} mb={4}>
        <Select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          bg={colors.inputBg}
          color={colors.text}
          fontWeight="medium"
        >
          <option
            value=""
            style={optionStyle}
          >
            Filter by Subject
          </option>
          <option
            value="Math"
            style={optionStyle}
          >Math
          </option>
          <option
            value="ELA-Literacy"
            style={optionStyle}
          >
            ELA
          </option>
        </Select>

        <Select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          bg={colors.inputBg}
          color={colors.text}
          fontWeight="medium"
        >
          <option
            value=""
            style={optionStyle}
          >
            Filter by Grade
          </option>
          <option
            value="Kindergarten"
            style={optionStyle}
          >Kindergarten
          </option>
          {[...Array(8).keys()].map((g) => {
            const gradeStr = `Grade ${g + 1}`;
            return (
              <option
                key={gradeStr}
                value={gradeStr}
                style={optionStyle}
              >
                {gradeStr}
              </option>
            );
          })}
        </Select>
      </Stack>

      {filteredStandards.length === 0 ? (
        <Text mt={6} color={colors.text} fontStyle="italic" textAlign="center">
          No standards found.
        </Text>
      ) : (
        <RecursiveAccordion
          data={groupedStandards}
          toggleStandardSelection={toggleStandard}
          selectedCodes={selectedCodes}
          colors={colors}
        />
      )}
    </Box>
  );
}

export default React.memo(StandardsPanel);
