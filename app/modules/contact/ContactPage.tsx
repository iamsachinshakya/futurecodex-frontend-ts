"use client";

import React, { useState, useEffect } from "react";

import { Mail, Phone, MapPin } from "lucide-react";
import FloatingBackground from "@/app/shared/components/ui/FloatingBackground";
import ContactHero from "@/app/modules/contact/components/ContactHero";
import ContactMethod from "@/app/modules/contact/components/ContactMethod";
import ContactForm from "@/app/modules/contact/components/ContactForm";
import MapSection from "@/app/modules/contact/components/MapSection";

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans">
      <FloatingBackground />
      <ContactHero />
      <ContactForm />
      <MapSection />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
}
