import { Tooltip as ChakraTooltip } from '@chakra-ui/react'
import * as React from 'react'

export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    showArrow,
    children,
    disabled,
    content,
    ...rest
  } = props

  if (disabled) return children

  return (
    <ChakraTooltip label={content} hasArrow={showArrow} {...rest} ref={ref}>
      {children}
    </ChakraTooltip>
  )
})
