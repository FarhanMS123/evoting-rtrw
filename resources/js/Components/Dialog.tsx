import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  Button,
  type AlertDialogProps,
  useDisclosure} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

export function DialogHelper({header, body, footer, link, cancel, ok, props,
  isOpen, leastDestructiveRef, onClose, ...rootProps
}: {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;

  link?: ReactNode;
  ok?: ReactNode | false;
  cancel?: ReactNode | false;

  props?: {
    overlay?: Parameters<typeof AlertDialogOverlay>[0] | false;
    content?: Parameters<typeof AlertDialogContent>[0];
    header?: Parameters<typeof AlertDialogHeader>[0];
    close?: Parameters<typeof AlertDialogCloseButton>[0] | false;
    body?: Parameters<typeof AlertDialogBody>[0];
    footer?: Parameters<typeof AlertDialogFooter>[0];
  }
} & Omit<AlertDialogProps, "isOpen" | "leastDestructiveRef" | "onClose"> & Partial<Pick<AlertDialogProps, "isOpen" | "leastDestructiveRef" | "onClose">>) {
  const { isOpen: isInternalOpen, onClose: onInternalClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  if (!props) props = {};

  return (
    <AlertDialog
      isOpen={isInternalOpen}
      leastDestructiveRef={cancelRef}
      onClose={onInternalClose}

      {...rootProps}
    >
      { props.overlay !== false && <AlertDialogOverlay {...props.overlay} /> }
      <AlertDialogContent {...props.content}>
        {header && <AlertDialogHeader {...props.header}>{ header }</AlertDialogHeader>}
        { props.close !== false && <AlertDialogCloseButton {...props.close} /> }

        {body && <AlertDialogBody {...props.body}>{ body }</AlertDialogBody>}
        { footer !== false && <AlertDialogFooter {...props.footer}>
          { footer ? footer : <>
            <Button variant="ghost" ref={cancelRef}>Cancel</Button>
            <Button>Ok</Button>
          </> }
        </AlertDialogFooter> }
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DialogContext() {
  return (<></>);
}
