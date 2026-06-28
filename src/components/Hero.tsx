/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import BookingForm from './BookingForm';

interface HeroProps {
  selectedServiceId: 'regular' | 'deep' | 'lease';
  onChangeServiceId: (id: 'regular' | 'deep' | 'lease') => void;
}

export default function Hero({ selectedServiceId, onChangeServiceId }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative pt-[110px] sm:pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-24 lg:pb-28 bg-[#FAFAFA] border-b border-gray-200/50 overflow-hidden"
    >
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-clean-mint/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Trust triggers */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left flex flex-col justify-center">

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-clean-navy leading-[1.1] tracking-tight">
                Premium House <br className="hidden sm:inline" />
                <span className="text-clean-mint">Cleaning</span> Services. <br />
                Book in 60 Seconds.
              </h1>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience Australia's top-rated professional home cleaning. Our verified, local domestic cleaners deliver unmatched excellence. Secure your regular house clean, deep clean, or 100% bond-back guaranteed end of lease clean with an instant flat-rate quote.
              </p>
            </div>




          </div>

          {/* Right Column: Multi-Step Quote Booking Card */}
          <div id="booking-form-anchor" className="lg:col-span-6 w-full max-w-xl mx-auto lg:max-w-none scroll-mt-24">
            <BookingForm
              selectedServiceId={selectedServiceId}
              onChangeServiceId={onChangeServiceId}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
