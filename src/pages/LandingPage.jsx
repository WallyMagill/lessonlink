import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, chakra, shouldForwardProp, Image, Icon,
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import {
  FaClipboardList, FaChalkboardTeacher, FaEdit, FaUsers,
} from 'react-icons/fa';
import dashboardImage from '../img/image.png';
import LandingHeader from '../components/LandingHeader';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const enhancedFeatures = [
  {
    title: 'Quick Access to Daily Lesson Plans',
    description:
      'Substitute teachers, parents, and principals can log in and view classroom-specific lesson plans in real time.',
    icon: FaClipboardList,
  },
  {
    title: 'Standardized Platform Format',
    description:
      'A consistent lesson format ensures familiarity and ease of use across all classrooms while remaining customizable.',
    icon: FaChalkboardTeacher,
  },
  {
    title: 'Lesson Plan Editor with Standards',
    description:
      'Design standards-aligned lesson plans effortlessly using our intuitive editor with curriculum integration.',
    icon: FaEdit,
  },
  {
    title: 'Collaboration Spaces',
    description:
      'Share, edit, and co-create lessons with fellow educators in real time to elevate teaching quality together.',
    icon: FaUsers,
  },
];

function FeaturesSection() {
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Box
      py={20}
      px={{ base: 6, md: 16 }}
      maxW="7xl"
      mx="auto"
      // Removed bg, borderRadius, boxShadow here to avoid box effect
    >
      <Heading
        as="h2"
        size="2xl"
        textAlign="center"
        mb={12}
        color="blue.500"
        fontWeight="extrabold"
        letterSpacing="wide"
        textShadow="0 1px 3px rgba(0,0,0,0.1)"
      >
        Platform Features
      </Heading>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={12}
        px={{ base: 4, md: 0 }}
      >
        {enhancedFeatures.map((feature, idx) => (
          <MotionBox
            key={feature.title}
            bg={useColorModeValue('white', 'gray.700')}
            p={8}
            borderRadius="2xl"
            boxShadow="0 10px 20px rgba(59, 130, 246, 0.4)"
            cursor="default"
            whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(59, 130, 246, 0.6)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <VStack align="start" spacing={5}>
              <Box
                bg="blue.100"
                color="blue.600"
                p={4}
                borderRadius="full"
                display="inline-flex"
                boxShadow="0 2px 6px rgba(59, 130, 246, 0.4)"
              >
                <Icon as={feature.icon} boxSize={7} />
              </Box>
              <Heading
                as="h3"
                size="lg"
                color="blue.500"
                fontWeight="semibold"
                letterSpacing="tight"
              >
                {feature.title}
              </Heading>
              <Text fontSize="md" color={textColor} lineHeight="tall">
                {feature.description}
              </Text>
            </VStack>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
}

function HowItWorksSection() {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Box py={20} px={{ base: 6, md: 16 }} maxW="7xl" mx="auto">
      <Heading
        as="h2"
        size="2xl"
        textAlign="center"
        mb={14}
        color="blue.500"
        fontWeight="extrabold"
        letterSpacing="wide"
        textShadow="0 1px 3px rgba(0,0,0,0.1)"
      >
        What Makes Us Special
      </Heading>

      <Grid
        templateColumns={{ base: '1fr', md: '2fr 1.5fr' }}
        gap={10}
        alignItems="center"
      >
        <MotionBox
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="0 12px 24px rgba(59, 130, 246, 0.6)"
        >
          <Image
            src={dashboardImage}
            alt="Teacher dashboard preview"
            objectFit="cover"
            maxH="500px"
            w="100%"
            loading="lazy"
            draggable={false}
          />
        </MotionBox>

        <MotionBox
          bg={bg}
          p={10}
          borderRadius="2xl"
          boxShadow="0 10px 20px rgba(59, 130, 246, 0.4)"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <VStack align="start" spacing={8}>
            <Box>
              <Heading
                as="h3"
                size="xl"
                color="blue.500"
                mb={3}
                fontWeight="semibold"
              >
                Lesson Remix Magic
              </Heading>
              <Text fontSize="lg" color={textColor} lineHeight="7">
                Remixing lets you copy another teacher’s lesson to make your own version that is editable, shareable, and part of a collaborative loop of improvement.
              </Text>
            </Box>

            <Box>
              <Heading
                as="h3"
                size="xl"
                color="blue.500"
                mb={3}
                fontWeight="semibold"
              >
                Standards at Your Fingertips
              </Heading>
              <Text fontSize="lg" color={textColor} lineHeight="7">
                Instantly pull up grade and subject standards right alongside your lesson plans so you can easily tailor, tweak, and level up your teaching with confidence and clarity.
              </Text>
            </Box>
          </VStack>
        </MotionBox>
      </Grid>
    </Box>
  );
}

function TermsText() {
  return (
    <Text>
      <Text mb={4}>Last Updated: May 2025</Text>
      <Text fontWeight="bold" mb={2}>1. Acceptance of Terms</Text>
      <Text mb={4}>By accessing and using LessonLink, you agree to these Terms...</Text>
    </Text>
  );
}

function PrivacyText() {
  return (
    <Text>
      <Text mb={4}>Last Updated: May 2025</Text>
      <Text fontWeight="bold" mb={2}>1. Information We Collect</Text>
      <Text mb={4}>- Personal information, usage data, etc.</Text>
    </Text>
  );
}

function SecurityText() {
  return (
    <Text>
      <Text mb={4}>Last Updated: May 2025</Text>
      <Text fontWeight="bold" mb={2}>1. Data Protection</Text>
      <Text mb={4}>- All data encrypted at rest and in transit, etc.</Text>
    </Text>
  );
}

function ContactText() {
  return (
    <>
      <Text>For questions, comments, and concerns please email</Text>
      <Text fontWeight="bold" color="blue.500" _hover={{ textDecoration: 'underline' }}>
        help@lessonlink.org
      </Text>
    </>
  );
}

function LandingPage() {
  const cardBg = useColorModeValue('whiteAlpha.900', 'gray.800');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const termsModal = useDisclosure();
  const privacyModal = useDisclosure();
  const securityModal = useDisclosure();
  const contactModal = useDisclosure();

  return (
    <Box width="100%" bg="white">
      <LandingHeader />

      {/* Gradient Hero Background, used ChatGPT to help */}
      <Box
        bgGradient="linear(to-r, blue.200, blue.500, blue.800, black)"
        bgSize="400% 400%"
        animation="gradient 15s ease infinite"
        style={{ animation: 'gradient 15s ease infinite' }}
        minH="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <style>
          {`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>

        <Container maxW="container.xl" py={16} px={8} zIndex="1">
          {/* Hero Section */}
          <MotionBox
            textAlign="center"
            py={20}
            px={8}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="0 12px 24px rgba(59, 130, 246, 0.6)" // blue.500 shadow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VStack spacing={6}>
              <Heading as="h1" size="2xl" fontWeight="extrabold" color="blue.500" textShadow="0px 2px 6px rgba(0,0,0,0.1)">
                Effortless Lesson Planning for Every Educator
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Stay organized. Collaborate easily. Share with confidence.
              </Text>
              <MotionBox
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Button
                  size="lg"
                  colorScheme="blue"
                  px={8}
                  py={6}
                  fontSize="lg"
                  onClick={handleSubmit}
                >
                  Get Started
                </Button>
              </MotionBox>
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      <HowItWorksSection />
      <FeaturesSection />

      {/* Footer */}
      <Box textAlign="center" mt={16} paddingY={8} color="gray.700">
        <Box display="flex" flexDirection="row" justifyContent="space-around" mb={4}>
          <Text _hover={{ color: 'blue.600', cursor: 'pointer' }} onClick={termsModal.onOpen}>Terms</Text>
          <Text _hover={{ color: 'blue.600', cursor: 'pointer' }} onClick={privacyModal.onOpen}>Privacy</Text>
          <Text _hover={{ color: 'blue.600', cursor: 'pointer' }} onClick={securityModal.onOpen}>Security</Text>
          <Text _hover={{ color: 'blue.600', cursor: 'pointer' }} onClick={contactModal.onOpen}>Contact</Text>
        </Box>
        <Text fontSize="sm">© 2025 LessonLink, Inc.</Text>
      </Box>

      {/* Modals */}
      {[
        { modal: termsModal, title: 'Terms of Service', body: TermsText },
        { modal: privacyModal, title: 'Privacy Policy', body: PrivacyText },
        { modal: securityModal, title: 'Security Information', body: SecurityText },
        { modal: contactModal, title: 'Contact Us', body: ContactText },
      ].map(({ modal, title, body: Body }) => (
        <Modal key={title} isOpen={modal.isOpen} onClose={modal.onClose} motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Body />
            </ModalBody>
          </ModalContent>
        </Modal>
      ))}
    </Box>
  );
}

export default LandingPage;
