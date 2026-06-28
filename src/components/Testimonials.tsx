/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials-section" className="py-20 bg-clean-navy text-clean-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-clean-white mt-4 tracking-tight">
            Loved by Australian Homeowners
          </h2>
          <p className="text-gray-300 mt-3 text-base sm:text-lg">
            Read real, unfiltered feedback from busy professionals and families who rely on our premier cleaning services.
          </p>
        </div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.005, delay: 0.005 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Decorative quote icon */}
          <div className="absolute -top-10 -left-6 text-white/5 pointer-events-none">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          <div className="bg-clean-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-sm relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Profile Avatar / Service */}
              <div className="flex flex-col items-center text-center shrink-0">
                <div className="relative">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-clean-mint/20 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-clean-mint text-clean-navy p-1.5 rounded-full shadow-md">
                    <CheckCircle2 className="w-4 h-4 fill-clean-navy text-clean-mint" />
                  </div>
                </div>

              </div>

              {/* Review Text */}
              <div className="flex-grow text-center md:text-left flex flex-col justify-between h-full min-h-[140px]">
                <div>
                  {/* Rating Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  {/* Testimonial Quote */}
                  <blockquote className="text-base sm:text-lg text-gray-100 font-normal leading-relaxed italic">
                    "{current.text}"
                  </blockquote>
                </div>

                {/* Name, Location & Date */}
                <div className="mt-6 flex flex-col md:flex-row items-center md:justify-between gap-2 border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-display font-bold text-sm text-clean-white">{current.name}</h4>
                    <p className="text-xs text-gray-400">{current.location}</p>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/5 hover:bg-white/10 text-clean-white rounded-full border border-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-clean-mint active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-clean-mint w-6'
                      : 'bg-white/30 hover:bg-white/55'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 bg-white/5 hover:bg-white/10 text-clean-white rounded-full border border-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-clean-mint active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
