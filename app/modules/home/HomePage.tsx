"use client";
import Categories from "@/app/modules/home/components/Categories";
import FeaturedPosts from "@/app/modules/home/components/FeaturedPosts";
import Hero from "@/app/modules/home/components/Hero";
import Footer from "@/app/shared/components/Footer";
import Header from "@/app/shared/components/Header";
import { LoginModal } from "@/app/shared/components/modals/auth/Login";
import { RegisterModal } from "@/app/shared/components/modals/auth/Register";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

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
