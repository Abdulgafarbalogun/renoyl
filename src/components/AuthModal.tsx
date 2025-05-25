// components/AuthModal.jsx
"use client";

import { X } from 'lucide-react';
import { useEffect, ReactNode } from 'react'; // Import ReactNode

// DO NOT import SignIn here
// import SignIn from './SignIn';

// Define an interface for the component's props
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function AuthModal({ isOpen, onClose, children }: AuthModalProps) {
  // Effect to handle Escape key and body scroll
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => { // Add KeyboardEvent type to event
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-sm relative transform transition-all duration-300 ease-in-out scale-95 group-hover:scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {/* Render the children passed to the modal */}
        {children}
      </div>
    </div>
  );
}