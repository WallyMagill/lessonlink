import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Header from '../components/Header';
import styles from '../styles/LandingPage.module.css';

function LandingPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box className={styles['landing-root']} minH="100vh" bg={bgColor}>
      <Header />
      <Container className={styles['main-content']} maxW="container.xl" py={16}>
        {/* Hero Section */}
        <Box
          className={styles['hero-section']}
          textAlign="center"
          py={20}
          px={8}
          bg={cardBg}
          borderRadius="xl"
          boxShadow="lg"
          mb={16}
        >
          <VStack spacing={6}>
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color="gray.700"
            >
              Effortless Lesson Planning for Every Educator
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Stay organized. Collaborate easily. Share with confidence.
            </Text>
            <Button
              size="lg"
              colorScheme="blue"
              px={8}
              py={6}
              fontSize="lg"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Get Started
            </Button>
          </VStack>
        </Box>

        {/* Features Grid */}
        <Grid
          className={styles['features-grid']}
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={8}
          px={4}
        >
          {[
            {
              title: 'Quick Access to Daily Lesson Plans',
              description: 'Substitute teachers, parents, and principals can log in and view classroom-specific lesson plans in real time.',
            },
            {
              title: 'Standardized Platform Format',
              description: 'A consistent lesson format ensures familiarity and ease of use across all classrooms while remaining customizable.',
            },
            {
              title: 'Lesson Plan Editor with Standards',
              description: 'Design standards-aligned lesson plans effortlessly using our intuitive editor with curriculum integration.',
            },
            {
              title: 'Collaboration Spaces',
              description: 'Share, edit, and co-create lessons with fellow educators in real-time to elevate teaching quality together.',
            },
          ].map((feature) => (
            <Box
              key={feature.title}
              className={styles['feature-card']}
              bg={cardBg}
              p={8}
              borderRadius="xl"
              boxShadow="md"
              borderLeft="4px solid"
              borderColor={borderColor}
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              <VStack align="start" spacing={4}>
                <Heading as="h2" size="lg" color="blue.500">
                  {feature.title}
                </Heading>
                <Text color="gray.600">
                  {feature.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </Grid>

        {/* Footer */}
        <Box className={styles.footer} textAlign="center" mt={16} color="gray.500">
          <Text>LessonLink!</Text>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;
