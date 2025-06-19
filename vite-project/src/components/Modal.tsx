import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  className = "",
  maxWidth = "max-w-md"
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg p-8 w-full ${maxWidth} mx-4 relative shadow-xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}