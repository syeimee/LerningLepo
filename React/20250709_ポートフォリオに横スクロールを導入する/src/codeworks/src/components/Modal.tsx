'use client';
import React from 'react';
import BodyWrapper from './BodyWrapper';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <BodyWrapper>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-white w-[70vw] h-[80vh] p-6 rounded text-black relative flex flex-col justify-center">
          {children}
        </div>
      </div>
    </BodyWrapper>
  );
};
