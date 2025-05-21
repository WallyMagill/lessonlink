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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';

function Header() {
  const navigate = useNavigate();
  const handleProfile = (event) => {
    event.preventDefault();
    navigate('/profile');
  };
  const handleName = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };
  const handleOut = (event) => {
    event.preventDefault();
    navigate('/');
  };
  return (
    <Flex
      as="header"
      width="100vw"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      p={4}
      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
      zIndex={10}
    >
      <Button
        fontWeight="bold"
        fontSize="1.25rem"
        color="#1a365d"
        background="transparent"
        _active={{ opacity: 0.8 }}
        onClick={handleName}
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
            <IconButton icon={<SettingsIcon />} variant="ghost" aria-label="Settings" />
          </PopoverTrigger>
          <Portal>
            <PopoverContent width="xs" minW="xs" display="flex" flexDirection="column" p={2}>
              <PopoverArrow />
              <PopoverBody display="flex" flexDirection="column" gap={2} p={0}>
                <Button w="100%" variant="ghost">Notifications</Button>
                <Button w="100%" variant="ghost">Display Options</Button>
                <Button w="100%" variant="ghost">Sharing</Button>
                <Button w="100%" variant="ghost" onClick={handleProfile}>Account</Button>
                <Button w="100%" variant="ghost" onClick={handleOut}>Sign Out</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <IconButton icon={<Avatar name="Fiona" size="sm" />} onClick={handleProfile} variant="ghost" aria-label="User" />
      </Flex>
    </Flex>
  );
}

export default Header;
