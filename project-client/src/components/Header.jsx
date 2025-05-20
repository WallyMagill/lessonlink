import React from 'react';
import {
  Flex, Text, IconButton, Avatar,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <Flex as="header" className={styles.header}>
      <Text className={styles.logo}>LESSONLINK</Text>
      <Flex className={styles['header-actions']} align="center" gap={2}>
        <IconButton icon={<SettingsIcon />} variant="ghost" aria-label="Settings" />
        <IconButton icon={<Avatar name="Fiona" size="sm" />} variant="ghost" aria-label="User" />
      </Flex>
    </Flex>
  );
}

export default Header;
