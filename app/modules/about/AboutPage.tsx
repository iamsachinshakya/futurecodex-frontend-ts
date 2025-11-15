"use client";

import CTASection from "@/app/modules/about/components/CTASection";
import HeroSection from "@/app/modules/about/components/HeroSection";
import MissionSection from "@/app/modules/about/components/MissionSection";
import StatsSection from "@/app/modules/about/components/StatsSection";
import TeamSection from "@/app/modules/about/components/TeamSection";
import TimelineSection from "@/app/modules/about/components/TimelineSection";
import AnimatedBackground from "@/app/shared/components/ui/AnimatedBackground";
import React, { useState, useEffect } from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <TimelineSection />
      <TeamSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;
