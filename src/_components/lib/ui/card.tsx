import React from 'react';
import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

type CardProps = {
  icon?: IconType;
  highlightText: string;
  text: string;
};

const Card: React.FC<CardProps> = ({ icon, highlightText, text }) => {
  return (
    <Box
      backgroundColor="white"
      boxShadow="lg"
      borderRadius="xl"
      p={5}
      maxW="sm"
      textAlign="center"
    >
      <Flex justifyContent="center" mb={4}>
        {icon && <Icon as={icon} w={10} h={10} color="primary" />}
      </Flex>
      <Text fontSize="lg" fontWeight="bold" color="primary" mb={2}>
        {highlightText}
      </Text>
      <Text fontSize="lg" color="gray.600">
        {text}
      </Text>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(Card), { ssr: false });
