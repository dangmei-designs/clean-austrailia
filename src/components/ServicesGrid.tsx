/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ShieldAlert, Sparkles, Home, Building2, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICE_PACKAGES } from '../data';
import { ServicePackage } from '../types';

interface ServicesGridProps {
  onSelectService: (serviceId: 'regular' | 'deep' | 'lease') => void;
}

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  // Simple helper to get icons for each card
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'regular':
        return <Home className="w-6 h-6 text-clean-navy" />;
      case 'deep':
        return <Sparkles className="w-6 h-6 text-clean-mint-dark" />;
      case 'lease':
        return <Building2 className="w-6 h-6 text-clean-navy" />;
      default:
        return <Home className="w-6 h-6" />;
    }
  };

  return (
    <section id="pricing-and-services" className="py-20 bg-clean-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-clean-navy mt-4 tracking-tight">
            Professional Cleaning, No Hidden Fees
          </h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Pick the cleaning option that fits your home. Click any card below to instantly start your quick booking.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.map((pkg: ServicePackage) => {
            const isDeep = pkg.id === 'deep';
            const isLease = pkg.id === 'lease';

            return (
              <motion.div
                key={pkg.id}
                id={`service-card-${pkg.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.005, delay: 0.005 }}
                className={`flex flex-col relative bg-clean-white rounded-3xl transition-all duration-300 ${
                  isDeep
                    ? 'border-2 border-clean-mint shadow-xl scale-100 lg:scale-[1.03] z-10'
                    : 'border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-clean-mint text-clean-navy font-display font-bold text-xs px-4 py-1.5 rounded-full tracking-wide uppercase shadow-sm">
                    Most Popular
                  </div>
                )}

                {/* Card Header */}
                <div className="p-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      {getServiceIcon(pkg.id)}
                    </div>
                    {isLease && (
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        100% Bond Guarantee
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-bold text-clean-navy">{pkg.name}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 min-h-[32px]">{pkg.tagline}</p>
                  
                  {/* Price */}
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-xs font-bold text-gray-500 align-super">From</span>
                    <span className="text-4xl font-display font-black text-clean-navy">${pkg.basePrice}</span>
                    <span className="text-xs text-gray-500 font-medium">/ flat rate</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    *Includes 1 Bed + 1 Bath. Easily add more rooms when booking.
                  </p>
                </div>

                {/* Features List */}
                <div className="p-8 pt-6 flex-grow flex flex-col justify-between">
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-clean-mint-dark shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Booking Trigger Button */}
                  <button
                    onClick={() => onSelectService(pkg.id)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-display font-bold text-sm transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isDeep
                        ? 'bg-clean-mint hover:bg-clean-mint-dark text-clean-navy shadow-md hover:shadow-lg focus:ring-clean-mint'
                        : 'bg-clean-navy hover:bg-clean-navy-light text-clean-white focus:ring-clean-navy'
                    }`}
                  >
                    Select & Customize Quote
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
