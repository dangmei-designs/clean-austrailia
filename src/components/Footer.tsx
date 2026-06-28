/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-clean-navy text-clean-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Promise */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-clean-mint p-1.5 rounded-lg shadow-[0_2px_8px_rgba(0,200,83,0.45)] flex items-center justify-center">
                <img
                  src="https://i.ibb.co/S7PzTKVw/kangaroo-shape.png"
                  alt="Clean Australia Logo"
                  className="w-4 h-4 object-contain [filter:drop-shadow(0_0.5px_0.5px_rgba(0,0,0,0.1))]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-base text-clean-white tracking-wider">
                CLEAN AUSTRALIA
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Australia's premier residential cleaning service. We pair busy families with police-cleared, fully insured cleaning experts to give you back your weekends.
            </p>
          </div>

          {/* Column 2: Our Services (SEO Keywords) */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-clean-mint">
              Home Cleaning Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#booking-form-anchor" className="hover:text-clean-mint transition-colors">Regular House Cleaning</a></li>
              <li><a href="#booking-form-anchor" className="hover:text-clean-mint transition-colors">One-Off Deep Cleaning</a></li>
              <li><a href="#booking-form-anchor" className="hover:text-clean-mint transition-colors">End of Lease Bond Cleaning</a></li>
              <li><a href="#booking-form-anchor" className="hover:text-clean-mint transition-colors">Internal Window Cleaning</a></li>
              <li><a href="#booking-form-anchor" className="hover:text-clean-mint transition-colors">Oven Deep Cleaning</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Locations */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-clean-mint">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-clean-mint shrink-0" />
                <a href="tel:1800555253" className="hover:text-clean-white transition-colors">
                  1800 555 253
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-clean-mint shrink-0" />
                <a href="mailto:bookings@cleanaustralia.com.au" className="hover:text-clean-white transition-colors">
                  bookings@cleanaustralia.com.au
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-clean-mint shrink-0 mt-0.5" />
                <span className="text-gray-400">Serving Sydney, Melbourne, Brisbane & Perth Metro</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:items-start text-center sm:text-left gap-1">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} Clean Australia Group Pty Ltd. All rights reserved. ABN 84 920 184 391.
            </p>
            <p className="text-[10px] text-gray-600 flex items-center justify-center sm:justify-start gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Australian families.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
