import { Alert as ChakraAlert, Text } from "@chakra-ui/react";
import * as React from "react";
import { CloseButton } from "./close-button";
import { MdOutlineErrorOutline } from "react-icons/md";

export interface AlertProps extends Omit<ChakraAlert.RootProps, "title"> {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactElement;
  closable?: boolean;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const {
      title,
      children,
      icon,
      closable,
      onClose,
      startElement,
      endElement,
      ...rest
    } = props;

    const iconCloned = React.cloneElement(icon || <MdOutlineErrorOutline />, {
      fill: `${props.colorPalette}.700`,
    });

    return (
      <ChakraAlert.Root ref={ref} {...rest}>
        {startElement || (
          <ChakraAlert.Indicator fill={`${props.colorPalette}.700`}>
            {iconCloned}
          </ChakraAlert.Indicator>
        )}
        {children ? (
          <ChakraAlert.Content>
            <ChakraAlert.Title>
              <Text color={`${props.colorPalette}.700`}>{title}</Text>
            </ChakraAlert.Title>
            <ChakraAlert.Description color={`${props.colorPalette}.700`}>
              {children}
            </ChakraAlert.Description>
          </ChakraAlert.Content>
        ) : (
          <ChakraAlert.Title flex="1">{title}</ChakraAlert.Title>
        )}
        {endElement}
        {closable && (
          <CloseButton
            size="sm"
            pos="relative"
            top="-2"
            insetEnd="-2"
            alignSelf="flex-start"
            onClick={onClose}
          />
        )}
      </ChakraAlert.Root>
    );
  }
);
