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
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react';

function LandingPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('blue.500', 'blue.300');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (page reload)
    navigate('/login');
  };

  const termsModal = useDisclosure();
  const privacyModal = useDisclosure();
  const securityModal = useDisclosure();
  const contactModal = useDisclosure();

  return (
    <Box
      width="100%"
      minH="100vh"
      bg={bgColor}
    >
      <Container maxW="container.xl" py={16} px={8}>
        {/* Hero Section */}
        <Box
          textAlign="center"
          py={20}
          px={8}
          bg={cardBg}
          borderRadius="xl"
          boxShadow="lg"
          mb={16}
          transition="all 0.2s ease-in-out"
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
              onClick={handleSubmit}
            >
              Get Started
            </Button>
          </VStack>
        </Box>

        {/* Features Grid */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={8}
          px={4}
          my={8}
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
        <Box textAlign="center" mt={16} color="gray.500">
          <Box display="flex" flexDirection="row" textAlign="center" justifyContent="space-around">
            <Text _hover={{ color: 'blue.500', cursor: 'pointer' }} onClick={termsModal.onOpen}>Terms</Text>
            <Text _hover={{ color: 'blue.500', cursor: 'pointer' }} onClick={privacyModal.onOpen}>Privacy</Text>
            <Text _hover={{ color: 'blue.500', cursor: 'pointer' }} onClick={securityModal.onOpen}>Security</Text>
            <Text _hover={{ color: 'blue.500', cursor: 'pointer' }} onClick={contactModal.onOpen}>Contact</Text>
          </Box>
          { /* Terms Modal */ }
          <Modal isOpen={termsModal.isOpen} onClose={termsModal.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Terms of Service</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* terms written by chatgpt */}
                <Text><Text mb={4}>Last Updated: May 2025</Text>

                  <Text fontWeight="bold" mb={2}>1. Acceptance of Terms</Text>
                  <Text mb={4}>
                    By accessing and using LessonLink, you agree to these Terms of Service.
                    If you do not agree, please do not use our platform.
                  </Text>

                  <Text fontWeight="bold" mb={2}>2. User Accounts</Text>
                  <Text mb={4}>
                    - Users must provide accurate information
                    - You are responsible for maintaining account confidentiality
                    - One account per individual
                    - Prohibited from sharing login credentials
                  </Text>

                  <Text fontWeight="bold" mb={2}>3. User Conduct</Text>
                  <Text mb={4}>
                    Users agree not to:
                    - Post offensive or inappropriate content
                    - Harass or discriminate against others
                    - Violate intellectual property rights
                    - Engage in fraudulent activities
                  </Text>

                  <Text fontWeight="bold" mb={2}>4. Intellectual Property</Text>
                  <Text mb={4}>
                    All content on LessonLink is protected. Users retain rights to their
                    original content but grant LessonLink a non-exclusive license to display
                    and distribute within the platform.
                  </Text>

                  <Text fontWeight="bold" mb={2}>5. Limitation of Liability</Text>
                  <Text mb={4}>
                    LessonLink is not liable for indirect, incidental, or consequential damages.
                    Our total liability is limited to the amount paid for services.
                  </Text>

                  <Text fontWeight="bold" mb={2}>6. Termination</Text>
                  <Text mb={4}>
                    We reserve the right to terminate accounts that violate these terms
                    without prior notice.
                  </Text>
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Privacy Modal */}
          <Modal isOpen={privacyModal.isOpen} onClose={privacyModal.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Privacy Policy</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* written by chatgpt */}
                <Text><Text mb={4}>Last Updated: May 2025</Text>

                  <Text fontWeight="bold" mb={2}>1. Information We Collect</Text>
                  <Text mb={4}>
                    - Personal information (name, email, contact details)
                    - Usage data and interactions
                    - Device and location information
                  </Text>

                  <Text fontWeight="bold" mb={2}>2. How We Use Your Information</Text>
                  <Text mb={4}>
                    - Provide and improve our services
                    - Personalize user experience
                    - Communicate updates and notifications
                    - Analyze platform usage
                  </Text>

                  <Text fontWeight="bold" mb={2}>3. Data Sharing</Text>
                  <Text mb={4}>
                    We do not sell personal data. We may share information with:
                    - Service providers
                    - Legal requirements
                    - Consent-based sharing
                  </Text>

                  <Text fontWeight="bold" mb={2}>4. Data Security</Text>
                  <Text mb={4}>
                    - Encrypted data transmission
                    - Secure server infrastructure
                    - Regular security audits
                    - Access controls
                  </Text>

                  <Text fontWeight="bold" mb={2}>5. User Rights</Text>
                  <Text mb={4}>
                    Users can:
                    - Request data access
                    - Request data deletion
                    - Opt-out of communications
                    - Update personal information
                  </Text>

                  <Text fontWeight="bold" mb={2}>6. Cookies and Tracking</Text>
                  <Text mb={4}>
                    We use cookies to enhance user experience and gather analytics.
                    Users can manage cookie preferences in browser settings.
                  </Text>
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Security Modal */}
          <Modal isOpen={securityModal.isOpen} onClose={securityModal.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Security Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* security written by chatgpt */}
                <Text mb={4}>Last Updated: May 2025</Text>

                <Text fontWeight="bold" mb={2}>1. Data Protection</Text>
                <Text mb={4}>
                  - All data encrypted at rest and in transit
                  - AES-256 encryption standard
                  - Regular security assessments
                </Text>

                <Text fontWeight="bold" mb={2}>2. Access Controls</Text>
                <Text mb={4}>
                  - Multi-factor authentication
                  - Role-based access management
                  - Regular credential rotation
                  - Automated threat detection
                </Text>

                <Text fontWeight="bold" mb={2}>3. Network Security</Text>
                <Text mb={4}>
                  - Firewall protection
                  - DDoS mitigation
                  - Intrusion detection systems
                  - Regular vulnerability scanning
                </Text>

                <Text fontWeight="bold" mb={2}>4. Incident Response</Text>
                <Text mb={4}>
                  - 24/7 security monitoring
                  - Rapid incident response team
                  - Transparent communication
                  - Comprehensive breach notification process
                </Text>

                <Text fontWeight="bold" mb={2}>5. Compliance</Text>
                <Text mb={4}>
                  Adheres to:
                  - GDPR
                  - CCPA
                  - HIPAA standards
                  - SOC 2 compliance
                </Text>

                <Text fontWeight="bold" mb={2}>6. User Security Recommendations</Text>
                <Text mb={4}>
                  - Use strong, unique passwords
                  - Enable two-factor authentication
                  - Regularly update account information
                  - Be cautious of phishing attempts
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* Contact Modal */}
          <Modal isOpen={contactModal.isOpen} onClose={contactModal.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Contact Us</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Add your contact information here */}
                <Text>For questions, comments, and concerns please email</Text>
                <Text fontWeight="bold" color="blue.500" _hover={{ color: 'blue', cursor: 'pointer', textDecorationLine: 'underline' }}> help@lessonlink.org </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Text>© 2025 LessonLink, Inc.</Text>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;
