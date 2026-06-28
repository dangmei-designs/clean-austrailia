/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1); // Default first one open

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-20 bg-gray-50 border-t border-gray-200/50 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-clean-navy mt-4 tracking-tight">
            Have Questions? We Have Answers
          </h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            Find immediate answers to questions about keys, equipment, safety, and our industry-leading guarantees.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.005, delay: 0.005 }}
                className="bg-clean-white rounded-2xl border border-gray-200/80 hover:border-gray-300 shadow-sm transition-all duration-300"
              >
                {/* Header / Button */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-clean-mint rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-start gap-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-clean-navy shrink-0 mt-0.5" />
                    <span className="font-display font-bold text-sm sm:text-base text-clean-navy">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full bg-gray-100 text-clean-navy transition-transform duration-300 ${isOpen ? 'rotate-180 bg-clean-mint/20 text-clean-navy' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Content Panel */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-5 sm:p-6 text-sm text-gray-600 leading-relaxed bg-gray-50/30">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
