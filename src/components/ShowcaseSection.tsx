/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  initialPos: number;
}

const showcaseData: ShowcaseItem[] = [
  {
    id: 'kitchen',
    title: 'Deep Kitchen Clean',
    description: 'Oven degreased, countertops sanitised, and stainless steel polished to a mirror finish.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    initialPos: 50,
  },
  {
    id: 'bathroom',
    title: 'Bathroom Sanitisation',
    description: 'Stubborn limescale removed, tiles deep-scrubbed, and glass doors polished streak-free.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    initialPos: 50,
  },
  {
    id: 'living',
    title: 'Living Room Refresh',
    description: 'Carpets deep-vacuumed, baseboards fully wiped, cushions fluffed, and fixtures detailed.',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    initialPos: 50,
  },
  {
    id: 'office',
    title: 'Workspace Deep Clean',
    description: 'Desktops fully sanitised, tech screens carefully dusted, and storage units reorganised.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    initialPos: 50,
  },
];

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const [sliderPosition, setSliderPosition] = useState(item.initialPos);

  return (
    <motion.div
      id={`showcase-card-${item.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.005, delay: 0.005, ease: 'easeOut' }}
      className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
    >
      {/* Slide Container */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none group bg-gray-100">
        
        {/* AFTER Image (Clean, radiant, beautiful) */}
        <img
          src={item.imageUrl}
          alt={`${item.title} - After`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 top-4 bg-clean-navy/90 backdrop-blur-sm text-clean-mint text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-20 shadow-sm">
          After
        </div>

        {/* BEFORE Image (Clipped by polygon based on slider value. Dim, dusty, desaturated) */}
        <img
          src={item.imageUrl}
          alt={`${item.title} - Before`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-[0.72] contrast-[0.88] saturate-[0.5] sepia-[0.15] transition-transform duration-700 group-hover:scale-102"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute left-4 top-4 bg-gray-950/90 backdrop-blur-sm text-gray-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-20 shadow-sm">
          Before
        </div>

        {/* Vertical Divider Slider Handle */}
        <div
          className="absolute inset-y-0 w-[3px] bg-clean-mint z-20 pointer-events-none shadow-[0_0_15px_rgba(0,200,83,0.6)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular drag knob */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-clean-navy text-clean-white border-2 border-clean-mint flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 z-20">
            <ArrowLeftRight className="w-4 h-4 text-clean-mint" />
          </div>
        </div>

        {/* Invisible range slider layered on top for perfect mobile/touch responsiveness */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label={`Drag to compare before and after of ${item.title}`}
        />
      </div>

      {/* Caption info below slider */}
      <div className="mt-5 space-y-2">
        <h4 className="font-display font-bold text-base sm:text-lg text-clean-navy">
          {item.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  return (
    <section
      id="before-after-showcase"
      className="py-16 md:py-24 bg-[#FAFAFA] border-t border-b border-gray-200/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-clean-navy tracking-tight leading-none">
            Stunning Before & After Results
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Drag the sliding handles left and right to interactively witness the meticulous care and pristine detail our vetted professionals bring to every space.
          </p>
        </div>

        {/* Responsive Grid Layout (2 Rows, 2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {showcaseData.map((item) => (
            <div key={item.id} className="flex flex-col h-full">
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
