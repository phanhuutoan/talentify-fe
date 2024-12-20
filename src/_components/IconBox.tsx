'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface IconBoxProps extends BoxProps {
  icon: IconType
}

export function IconBox({ icon: Icon, ...props }: IconBoxProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" {...props}>
      <Icon size={props.boxSize as number} />
    </Box>
  )
}

