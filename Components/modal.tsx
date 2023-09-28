import { useCallback, useEffect, useState } from "react";
import Button from "./ui/button";
import { ApolloError } from "@apollo/client";

interface ModalProps {
  isOpen?: boolean;
  onSubmit?: () => void;
  title?: string | React.ReactNode;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string | React.ReactNode;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string | React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onSubmit,
  title,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      <div className="justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0  outline-none focus:outline-none ">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div className="translate duration-300 w-full ">
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center p-6 rounded-t justify-center relative ">
                <div className="text-4xl font-semibold text-black font-gotham">
                  {title}
                </div>
              </div>
              <div className="relative p-6 flex flex-col justify-center ">
                {body}
              </div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center justify-around ">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  {actionLabel && !disabled && (
                    <Button
                      disabled={disabled}
                      label={actionLabel as string | React.ReactNode}
                      onClick={handleSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
