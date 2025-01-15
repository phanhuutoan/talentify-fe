import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/_components/lib/ui/dialog";
import { Button, DialogContentProps } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface DialogInput {
  isOpen: boolean;
  title: ReactNode;
  body: ReactNode;
  dialogProps?: DialogContentProps;
  onCancel?: () => void;
  onOk?: () => void;
}

export const useConfirmDialog = (props: DialogInput) => {
  const { isOpen, dialogProps = {}, title, body, onCancel, onOk } = props;
  const [isDialogOpen, setDialogOpen] = useState<boolean>(isOpen);

  const dialog = (
    <DialogRoot
      role="alertdialog"
      size="lg"
      placement="center"
      closeOnEscape
      open={isDialogOpen}
    >
      <DialogContent {...dialogProps}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">{body}</DialogBody>
        <DialogFooter>
          {onCancel && (
            <DialogActionTrigger asChild>
              <Button variant="solid" onClick={onCancel}>
                Cancel
              </Button>
            </DialogActionTrigger>
          )}
          {onOk && (
            <DialogActionTrigger asChild>
              <Button variant="solid" onClick={onOk}>
                Okay
              </Button>
            </DialogActionTrigger>
          )}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );

  return {
    Dialog: dialog,
    onClose: () => setDialogOpen(false),
    onOpen: () => setDialogOpen(true),
  };
};
