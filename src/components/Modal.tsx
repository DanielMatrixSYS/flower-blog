import React, { useEffect, useState } from "react";
import Title from "./Typography/Title";
import Description from "./Typography/Description";
import Hint from "./Typography/Hint";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  descriptionType?: "hint" | "description";
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  description,
  descriptionType = "description",
}) => {
  const [displayModal, setDisplayModal] = useState(isOpen);

  useEffect(() => {
    setDisplayModal(isOpen);
  }, [isOpen]);

  if (!displayModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 overflow-y-auto h-full w-full z-50 animate-fade-in-fast"
      onClick={onClose}
    >
      <div
        className="relative block mx-auto space-y-2 p-6 dark:border dark:border-neutral-700 w-96 xl:w-2/5 shadow-box-sm rounded-md bg-neutral-100 dark:bg-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-start">
          <Title text={title} />

          {descriptionType === "hint" ? (
            <Hint text={description || ""} />
          ) : (
            <Description text={description || ""} />
          )}
        </div>

        <hr className="border-neutral-300 dark:border-neutral-500" />

        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
