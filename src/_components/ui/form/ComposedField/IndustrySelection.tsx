import {
  Box,
  CheckboxGroup,
  DialogTitle,
  Fieldset,
  Flex,
  Icon,
  Separator,
  Text,
} from "@chakra-ui/react";
import { CustomLabel } from "../CustomLabel";
import { Button } from "@/_components/lib/ui/button";
import { PiDotsThree } from "react-icons/pi";
import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/_components/lib/ui/dialog";
import { IoCheckmarkDone } from "react-icons/io5";
import { useController, useFormContext } from "react-hook-form";
import { validIndustries } from "@/_static-data/valid-industries";
import { Checkbox } from "@/_components/lib/ui/checkbox";
import { FormErrorMessage } from "../_formErrMessage";

interface Props {
  formName: string;
  onDoneClick?: () => void;
}

export const IndustrySelectionField = (props: Props) => {
  const { control } = useFormContext();

  const onDoneSelect = () => {
    props.onDoneClick?.();
    console.log("Selected industries", industries.field.value);
  };

  const industries = useController<{ [props.formName]: string[] }>({
    control,
    name: props.formName,
    defaultValue: [],
  });

  const renderFieldSetGroup = () => {
    return (
      <Box id="grid-item">
        <Fieldset.Root>
          <CheckboxGroup
            value={industries.field.value}
            onValueChange={industries.field.onChange}
            name={industries.field.name}
          >
            <Fieldset.Content
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridColumnGap={8}
              gridRowGap={8}
            >
              {validIndustries.map((ind) => {
                const isActive = industries.field.value.includes(ind.title);
                return (
                  <Box key={ind.title}>
                    <Flex
                      alignItems="center"
                      mb={2}
                      borderRadius="50px"
                      border="2px solid"
                      borderColor={isActive ? "brand.100" : "gray.900"}
                      w="fit-content"
                      p=".7rem 1.2rem"
                    >
                      <Checkbox
                        value={ind.title}
                        variant="solid"
                        colorPalette="brand"
                        display="flex"
                        size="sm"
                        strokeColor="white"
                        controlProps={{
                          borderColor: !isActive ? "gray.800" : undefined,
                        }}
                      >
                        <Text
                          color={isActive ? "brand.100" : "gray.900"}
                          fontWeight={600}
                        >
                          {ind.title}
                        </Text>
                      </Checkbox>
                    </Flex>
                    <Text color="gray.800" ml={2} textStyle="xs">
                      {ind.desc}
                    </Text>
                  </Box>
                );
              })}
            </Fieldset.Content>
          </CheckboxGroup>
        </Fieldset.Root>
      </Box>
    );
  };

  return (
    <>
      <DialogRoot size="xl" placement="center">
        <DialogBackdrop />
        <DialogTrigger asChild>
          <Box w="full">
            <CustomLabel isRequired>Industry</CustomLabel>
            <Button
              mt={2}
              colorPalette="brand"
              variant="solid"
              w="full"
              justifyContent="space-between"
            >
              Select your favors
              <Icon boxSize={8} fill="gray.100">
                <PiDotsThree />
              </Icon>
            </Button>
            <FormErrorMessage
              errors={industries.formState.errors}
              name={props.formName}
            />
          </Box>
        </DialogTrigger>
        <Flex w="full" wrap="wrap" mt="-1rem">
          {industries.field.value.map((ind) => (
            <Button
              size="sm"
              colorPalette="orange"
              variant="subtle"
              key={ind}
              mr={4}
              mt={4}
            >
              {ind}
            </Button>
          ))}
        </Flex>
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>
              <Text textStyle="2xl" fontWeight={600} mb={2}>
                What industry are you hiring for?
              </Text>
              <Text color="gray.700" fontWeight={500} fontSize="sm">
                (Select all that apply)
              </Text>
            </DialogTitle>
          </DialogHeader>
          <DialogBody>{renderFieldSetGroup()}</DialogBody>
          <Box px="2rem">
            <Separator borderColor="brand.100" size="sm" my="1.2rem" />
          </Box>
          <DialogFooter justifyContent="flex-start">
            <DialogActionTrigger asChild>
              <Button
                colorPalette="brand"
                variant="solid"
                textStyle="lg"
                onClick={onDoneSelect}
              >
                <Icon boxSize={6} stroke="white">
                  <IoCheckmarkDone />
                </Icon>
                Select
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
