/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Header from './components/Header';
import Hero from './components/Hero';

import ServicesGrid from './components/ServicesGrid';
import ShowcaseSection from './components/ShowcaseSection';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<'regular' | 'deep' | 'lease'>('regular');

  // Initialize Lenis smooth scroll with premium smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Smooth scroll handler to scroll to booking form anchor
  const handleScrollToForm = () => {
    const formAnchor = document.getElementById('booking-form-anchor');
    if (formAnchor) {
      formAnchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill form from Service Grid cards and scroll to form smoothly
  const handleSelectServiceFromGrid = (serviceId: 'regular' | 'deep' | 'lease') => {
    setSelectedServiceId(serviceId);
    setTimeout(() => {
      handleScrollToForm();
    }, 50);
  };

  return (
    <div className="min-h-screen bg-clean-white text-gray-800 antialiased font-sans">
      
      {/* 1. Header with sticky button */}
      <Header onBookNowClick={handleScrollToForm} />

      {/* Main Layout Blocks */}
      <main>
        {/* 2. Hero Section (Split Screen, contains Interactive Quote Form) */}
        <Hero
          selectedServiceId={selectedServiceId}
          onChangeServiceId={setSelectedServiceId}
        />



        {/* 4.5. Before & After Interactive Showcase */}
        <ShowcaseSection />

        {/* 4. Pricing and Services Grid (Flat rate cards pre-fills quote) */}
        <ServicesGrid onSelectService={handleSelectServiceFromGrid} />

        {/* 5. Customer Testimonials Reviews Carousel */}
        <Testimonials />

        {/* 6. FAQ Accordion to address customer friction */}
        <FaqSection />
      </main>

      {/* 7. Footer with copyright, emails, and contacts */}
      <Footer />

    </div>
  );
}

