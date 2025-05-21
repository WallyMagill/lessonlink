import React from 'react';
import {
  Flex, Text, IconButton, Avatar,

  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  // PopoverCloseButton,
  Portal,
  Button,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <Flex as="header" className={styles.header}>
      <Text className={styles.logo}>LESSONLINK</Text>
      <Flex className={styles['header-actions']} align="center" gap={2}>
        {/* <IconButton icon={<SettingsIcon />} variant="ghost" aria-label="Settings" /> */}
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
                <Button w="100%" variant="ghost">Account</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <IconButton icon={<Avatar name="Fiona" size="sm" />} variant="ghost" aria-label="User" />
      </Flex>
    </Flex>
  );
}

export default Header;
