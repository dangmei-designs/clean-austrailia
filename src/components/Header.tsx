/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface HeaderProps {
  onBookNowClick: () => void;
}

export default function Header({ onBookNowClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white shadow-md py-2 sm:py-3 border-gray-200/60'
          : 'bg-white/95 backdrop-blur-sm py-2.5 sm:py-4 md:py-5 border-gray-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <a
            href="#"
            id="header-logo"
            className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none focus:ring-2 focus:ring-clean-mint/50 rounded-lg p-0.5 sm:p-1"
          >
            <div className="bg-clean-mint p-1 sm:p-1.5 rounded-lg sm:rounded-xl transition-transform group-hover:scale-105 duration-200 shadow-[0_3px_12px_rgba(0,200,83,0.45)] border border-clean-mint/20 flex items-center justify-center">
              <img
                src="https://i.ibb.co/S7PzTKVw/kangaroo-shape.png"
                alt="Clean Australia Logo"
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.15))]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-lg md:text-xl text-clean-navy tracking-tight leading-none">
                CLEAN AUSTRALIA
              </span>
              <span className="text-[8px] sm:text-[10px] text-gray-500 font-semibold tracking-widest uppercase mt-0.5 sm:mt-1">
                Premium Home Services
              </span>
            </div>
          </a>

          {/* Right Action Section */}
          <div className="flex items-center gap-2 sm:gap-6">
            {/* Phone Info */}
            <a
              href="tel:1800555253"
              id="header-phone-link"
              className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none focus:ring-2 focus:ring-clean-mint/50 rounded-lg p-1 transition-colors"
            >
              <div className="bg-clean-navy/5 p-1.5 sm:p-2 rounded-full text-clean-navy group-hover:bg-clean-navy group-hover:text-white transition-all duration-200">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] text-gray-500 font-medium leading-none">
                  TALK TO AN EXPERT
                </span>
                <span className="text-sm font-bold text-clean-navy leading-tight mt-0.5">
                  1800 555 253
                </span>
              </div>
            </a>

            {/* Sticky Action Button */}
            <button
              onClick={onBookNowClick}
              id="header-book-now-button"
              className="relative overflow-hidden bg-clean-mint hover:bg-clean-mint-dark text-clean-navy font-display font-bold text-[10px] sm:text-xs md:text-sm px-3 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 duration-200 focus:outline-none focus:ring-2 focus:ring-clean-mint focus:ring-offset-2 focus:ring-offset-white"
            >
              <span className="relative z-10">Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
