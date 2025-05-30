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

function ShareModal({
  isOpen, onClose, lesson, updateLesson, shareLesson,
}) {
  const [email, setSharedUser] = useState('');
  const [emailError, setEmailError] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share Lesson</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Flex flexDirection="column">
              {/* privacy (taken out from lessoneditor) */}
              <Flex alignItems="center" width="full" justifyContent="space-between">
                <Text>Lesson Visibility</Text>
                <Flex alignItems="center" gap={2}>
                  <Flex flexDirection="column"> </Flex>
                  <Text>
                    {lesson.status === 'public' ? 'Public' : 'Private'}
                  </Text>
                  <Switch
                    isChecked={lesson.status === 'public'}
                    onChange={() => updateLesson('status', lesson.status === 'public' ? 'protected' : 'public')}
                  />
                </Flex>
              </Flex>
              <Text fontSize="sm" color="gray.500" mt={1}>If your lesson is copied from someone else, the original owner will still be able to see it.</Text>

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
              onClick={() => {
                const subject = encodeURIComponent('View my lesson on LessonLink!');
                const body = encodeURIComponent(`Hi,\n\nPlease view my lesson plan linked below:\n${window.location.href}`);
                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
              }}
            >
              Share via Email
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function ShareButton({ lesson, updateLesson, shareLesson }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
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
