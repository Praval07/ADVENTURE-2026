import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TimelineSection from "@/components/home/TimelineSection";
import GuidelinesSection from "@/components/home/GuidelinesSection";
import EvaluationCriteriaSection from "@/components/home/EvaluationCriteriaSection";
import PrizesSection from "@/components/home/PrizesSection";
import GallerySection from "@/components/home/GallerySection";
import FaqSection from "@/components/home/FaqSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-x-hidden">
      {/* 1. Cinematic Video Hero */}
      <HeroSection />

      {/* 2. About the Challenge & Eligibility */}
      <AboutSection />

      {/* 3. 8 Competition Categories */}
      <CategoriesSection />

      {/* 4. 4-Stage Participation Journey */}
      <ProcessSection />

      {/* 5. Official Timeline Roadmap */}
      <TimelineSection />

      {/* 6. Participation Guidelines & Rules */}
      <GuidelinesSection />

      {/* 7. Objective 100-Marks Evaluation Criteria */}
      <EvaluationCriteriaSection />

      {/* 8. Prizes & QR-Verified Digital Certificates */}
      <PrizesSection />

      {/* 9. Production & Ideation Visual Gallery */}
      <GallerySection />

      {/* 10. Frequently Asked Questions */}
      <FaqSection />

      {/* 11. Institutional Contact & Inquiry Form */}
      <ContactSection />
    </main>
  );
}

