import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  Button,
  type AlertDialogProps,
  useDisclosure,
  ButtonProps} from "@chakra-ui/react";
import { type ForwardedRef, ReactNode, useRef } from "react";

export function DialogFooter({cancelText, okText, linkText, linkHref, props, cancelRef, ...rootProps}: {
  cancelText?: ReactNode | false;
  okText?: ReactNode | false;
  linkText?: ReactNode;
  linkHref?: string;

  props?: {
    cancel?: Omit<ButtonProps, "ref">;
    ok?: ButtonProps;
  };
  cancelRef: ForwardedRef<HTMLButtonElement>;
} & Parameters<typeof AlertDialogFooter>[0]) {

  if (!props) props = {};

  return (
    <AlertDialogFooter {...rootProps}>
      { cancelText !== false && <Button variant="ghost" ref={cancelRef} { ...props.cancel }>{ cancelText ?? "Cancel" }</Button> }
      { okText !== false && <Button { ...props.ok }>{ okText ?? "Ok" }</Button> }
    </AlertDialogFooter>
  );
}

export function useDialog() {
  const { isOpen, onOpen, onClose, ...use_disclosure } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return { isOpen, onOpen, onClose, cancelRef, ...use_disclosure };
}

export function DialogSkeleton({header, children, footer, props, ...rootProps}: {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;

  props?: {
    overlay?: Parameters<typeof AlertDialogOverlay>[0] | false;
    content?: Parameters<typeof AlertDialogContent>[0];
    header?: Parameters<typeof AlertDialogHeader>[0];
    close?: Parameters<typeof AlertDialogCloseButton>[0] | false;
    body?: Parameters<typeof AlertDialogBody>[0];
    footer?: Parameters<typeof AlertDialogFooter>[0];
  }
} & Omit<AlertDialogProps, "children">) {
  if (!props) props = {};

  return (
    <AlertDialog {...rootProps}>
      { props.overlay !== false && <AlertDialogOverlay {...props.overlay} /> }
      <AlertDialogContent {...props.content}>
        { header && <AlertDialogHeader {...props.header}>{ header }</AlertDialogHeader> }
        { props.close !== false && <AlertDialogCloseButton {...props.close} /> }

        <AlertDialogBody {...props.body}>{ children }</AlertDialogBody>
        <AlertDialogFooter {...props.footer}>{ footer }</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DialogHelper() {
  // const { isOpen: isInternalOpen, onClose: onInternalClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
}

export function DialogContext() {
  return (<></>);
}
