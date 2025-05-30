import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Flex,
  Text,
  Switch,
  useDisclosure,
} from '@chakra-ui/react';
import { useTheme } from './ThemeContext';

function ShareModal({
  isOpen, onClose, lesson, updateLesson, shareLesson,
}) {
  const [email, setSharedUser] = useState('');
  const [emailError, setEmailError] = useState('');
  const { colors, isDarkMode } = useTheme();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // alert('Link copied to clipboard!'); // Optional confirmation
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={colors.modalBg}>
        <ModalHeader color={colors.text}>Share Lesson</ModalHeader>
        <ModalCloseButton color={colors.text} />
        <ModalBody>
          <VStack spacing={4}>
            <Flex flexDirection="column">
              {/* privacy (taken out from lessoneditor) */}
              <Flex alignItems="center" width="full" justifyContent="space-between">
                <Text color={colors.text}>Lesson Visibility</Text>
                <Flex alignItems="center" gap={2}>
                  <Flex flexDirection="column"> </Flex>
                  <Text color={colors.text}>
                    {lesson.status === 'public' ? 'Public' : 'Private'}
                  </Text>
                  <Switch
                    isChecked={lesson.status === 'public'}
                    onChange={() => updateLesson('status', lesson.status === 'public' ? 'protected' : 'public')}
                  />
                </Flex>
              </Flex>
              <Text fontSize="sm" color={isDarkMode ? 'gray.300' : 'gray.500'} mt={1}>If your lesson is copied from someone else, the original owner will still be able to see it.</Text>

            </Flex>
            <Flex width="full" gap={2}>

              <Input
                placeholder="Enter email to share with"
                value={email}
                onChange={(e) => {
                  setSharedUser(e.target.value);
                  setEmailError('');
                }}
                isInvalid={!!emailError}
                flex={1}
                bg={colors.inputBg}
                color={colors.text}
              />
              {emailError && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {emailError}
              </Text>
              )}

            </Flex>

            <Button
              width="full"
              colorScheme="blue"
              color={isDarkMode ? 'white' : undefined}
              onClick={() => {
                const subject = encodeURIComponent('View my lesson on LessonLink!');
                const body = encodeURIComponent(`Hi,\n\nPlease view my lesson plan linked below:\n${window.location.href}`);
                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
              }}
            >
              Share via Email
            </Button>

            <Button
              variant="ghost"
              onClick={handleCopyToClipboard}
              style={{ border: '1px solid lightblue', color: 'lightblue' }}
            >
              Copy Link
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue" color={isDarkMode ? 'white' : undefined}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function ShareButton({ lesson, updateLesson, shareLesson }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isDarkMode } = useTheme();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" color={isDarkMode ? 'white' : undefined}>
        Share
      </Button>
      <ShareModal
        isOpen={isOpen}
        onClose={onClose}
        lesson={lesson}
        updateLesson={updateLesson}
        shareLesson={shareLesson}
      />
    </>
  );
}

export default ShareButton;
