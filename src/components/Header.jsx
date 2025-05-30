import React from 'react';
import {
  Flex, IconButton, Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Portal,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';
import useStore from '../store';
import { useTheme } from './ThemeContext';

function Header() {
  const navigate = useNavigate();
  const isAuth = useStore(({ authSlice }) => authSlice.authenticated);
  const signoutUser = useStore(({ authSlice }) => authSlice.signoutUser);
  const email = useStore(({ authSlice }) => authSlice.email);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const handleProfile = (event) => {
    event.preventDefault();
    navigate('/profile');
  };

  const handleHome = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  const handleSignOut = (event) => {
    event.preventDefault();
    signoutUser();
    navigate('/');
  };

  return (
    <Flex
      as="header"
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg={colors.cardBg}
      p={4}
      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
      zIndex={10}
    >
      <Button
        fontWeight="bold"
        fontSize="1.25rem"
        color={colors.text}
        background="transparent"
        _active={{ opacity: 0.8 }}
        onClick={handleHome}
      >
        LESSONLINK
      </Button>
      <Flex
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Popover>
          <PopoverTrigger>
            <IconButton icon={<SettingsIcon />} variant="ghost" aria-label="Settings" color={colors.text} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent width="xs" minW="xs" display="flex" flexDirection="column" p={2} bg={colors.modalBg}>
              <PopoverArrow bg={colors.modalBg} />
              <PopoverBody display="flex" flexDirection="column" gap={2} p={0}>
                {isAuth ? (
                  <>
                    <Button w="100%" variant="ghost" onClick={onOpen} color={colors.text}>Display Options</Button>
                    <Button w="100%" variant="ghost" onClick={handleProfile} color={colors.text}>Account</Button>
                    <Button w="100%" variant="ghost" onClick={handleSignOut} color={colors.text}>Sign Out</Button>
                  </>
                )
                  : (
                    <>
                      <Button w="100%" variant="ghost" onClick={handleLogIn} color={colors.text}>Log In</Button>
                      <Button w="100%" variant="ghost" onClick={handleSignUp} color={colors.text}>Sign Up</Button>
                    </>
                  )}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
        {isAuth && (
          <IconButton
            icon={(
              <Avatar
                name={email ? `${email}` : 'User'}
                size="sm"
              />
            )}
            onClick={handleProfile}
            variant="ghost"
            aria-label="User"
          />
        )}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={colors.modalBg}>
          <ModalHeader color={colors.text}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</ModalHeader>
          <ModalCloseButton color={colors.text} />
          <ModalBody pb={6}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color={colors.text}>Toggle Theme</Text>
              <Switch
                isChecked={isDarkMode}
                onChange={toggleTheme}
                colorScheme="blue"
                size="lg"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Header;
