import React from "react";

import type { ButtonProps, ModalProps } from "@nextui-org/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

type AlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  color?: ButtonProps["color"];
  title?: React.ReactNode;
  message?: string;
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonProps?: Omit<ButtonProps, "children">;
  cancelButtonProps?: Omit<ButtonProps, "children">;
  modalProps?: Omit<ModalProps, "opened" | "onClose">;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  onClose,
  isOpen,
  isLoading,
  color,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonProps,
  cancelButtonProps,
  confirmButtonText,
  cancelButtonText,
  modalProps,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isLoading) onClose();
      }}
      size="sm"
      {...modalProps}
    >
      <ModalContent>
        <ModalHeader>
          <h5 className="font-semibold text-xl">{title}</h5>
        </ModalHeader>

        <ModalBody>
          {message ? <p className="py-2 text-opacity-50">{message}</p> : null}
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              disabled={isLoading}
              {...cancelButtonProps}
              onClick={onCancel || onClose}
            >
              {cancelButtonText || "Batal"}
            </Button>
            <Button
              compact={false}
              color={color}
              loading={isLoading}
              {...confirmButtonProps}
              onClick={onConfirm}
            >
              {confirmButtonText || "Konfirmasi"}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AlertDialog;
