"use client";

import { useState, createContext, useContext, ReactNode } from "react";

interface ModalContextType {
  showLoginModal: boolean;
  showRegisterModal: boolean;
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
  handleCloseModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showLoginModal,
        showRegisterModal,
        handleLoginClick,
        handleRegisterClick,
        handleCloseModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
