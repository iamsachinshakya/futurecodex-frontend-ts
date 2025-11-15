"use client";
import Categories from "@/app/modules/home/components/Categories";
import FeaturedPosts from "@/app/modules/home/components/FeaturedPosts";
import Hero from "@/app/modules/home/components/Hero";
import Footer from "@/app/shared/components/layout/Footer";
import Header from "@/app/shared/components/layout/Header";
import { LoginModal } from "@/app/shared/components/modals/auth/Login";
import { RegisterModal } from "@/app/shared/components/modals/auth/Register";
import AnimatedBackground from "@/app/shared/components/ui/AnimatedBackground";
import React, { useState } from "react";

const HomePage: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <AnimatedBackground />

      <Header
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseModals}
        onSwitchToRegister={handleRegisterClick}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={handleCloseModals}
        onSwitchToLogin={handleLoginClick}
      />

      <Hero />
      <Categories />
      <FeaturedPosts />
      <Footer />
    </div>
  );
};

export default HomePage;
