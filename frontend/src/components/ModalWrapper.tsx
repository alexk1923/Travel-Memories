// Modal.tsx
import React, { ReactNode } from "react";
import { FaWindowClose } from "react-icons/fa";

interface ModalProps {
  title: string;
  onCloseFn: () => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalProps> = ({ children, title, onCloseFn }) => {
  const handleSubmit = () => {
    onCloseFn();
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
      <div className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50"></div>
      <div className="relative z-50 rounded-md bg-pure-white shadow-md lg:w-[25%]">
        <div className="flex w-full items-center justify-between bg-primary px-4 py-4 text-center font-semibold text-white">
          <span className="flex-grow">{title}</span>{" "}
          <span onClick={onCloseFn} className="cursor-pointer">
            X
          </span>
        </div>
        <div className="p-8 text-black">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
