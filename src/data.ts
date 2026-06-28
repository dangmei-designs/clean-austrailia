/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServicePackage, Testimonial, FAQItem } from './types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'regular',
    name: 'Regular Clean',
    tagline: 'Perfect for keeping your home neat and clean on a regular basis.',
    basePrice: 119,
    pricePerBed: 25,
    pricePerBath: 20,
    features: [
      'Dust all surfaces & furniture',
      'Vacuum carpets & rugs',
      'Mop hard floors',
      'Scrub kitchen counters, stove & sink',
      'Clean toilet, shower, mirror & vanity',
      'Empty bins & tidy up general clutter'
    ]
  },
  {
    id: 'deep',
    name: 'Deep Clean',
    tagline: 'Best for first-time visits or homes that need extra attention.',
    basePrice: 219,
    pricePerBed: 35,
    pricePerBath: 30,
    isPopular: true,
    features: [
      'Everything in the Regular Clean',
      'Clean inside microwave & outside of appliances',
      'Detailed dusting of skirting boards',
      'Scrub bathroom wall tiles & grout',
      'Remove cobwebs & high dust',
      'Wipe doors, handles & light switches'
    ]
  },
  {
    id: 'lease',
    name: 'End of Lease Clean',
    tagline: 'Designed to satisfy your agent and get your full bond back.',
    basePrice: 349,
    pricePerBed: 50,
    pricePerBath: 40,
    features: [
      '100% Bond-Back Guarantee (72h free re-clean)',
      'Wash inside windows & track rails',
      'Wipe off wall scuffs & fingerprints',
      'Deep clean oven inside & out',
      'Clean inside all empty cupboards & drawers',
      'Degrease range hood, filters & exhaust fans'
    ]
  }
];

export const EXTRAS_LIST = [
  { id: 'insideOven', name: 'Oven Deep Clean', price: 45, icon: 'Flame' },
  { id: 'insideFridge', name: 'Fridge Interior', price: 35, icon: 'Refrigerator' },
  { id: 'windows', name: 'Internal Windows', price: 60, icon: 'Layers' },
  { id: 'balcony', name: 'Balcony / Patio Sweep', price: 30, icon: 'Grid' },
  { id: 'cabinets', name: 'Inside Cabinets (Empty)', price: 40, icon: 'FolderOpen' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'Paddington, NSW',
    rating: 5,
    text: 'Clean Australia has been a lifesaver. With two kids and a full-time job, I just couldn\'t keep up. Their fortnightly service is absolute perfection. I love coming home on clean day!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    serviceType: 'Regular Fortnightly Clean',
    date: '3 days ago'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    location: 'Richmond, VIC',
    rating: 5,
    text: 'We booked the End of Lease Clean. The real estate agent was notoriously strict, but the cleaners did such an incredible job that we got our 100% bond back without a single issue. Worth every cent.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    serviceType: 'End of Lease Clean',
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Emily Thompson',
    location: 'New Farm, QLD',
    rating: 5,
    text: 'I scheduled a Deep Clean after hosting a massive family weekend. The level of detail was unbelievable. They scrubbed grout I thought was permanently stained, and the kitchen is sparkling. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    serviceType: 'One-Off Deep Clean',
    date: '2 weeks ago'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'Do I need to be home for the cleaning?',
    answer: 'No, you don\'t! Many of our clients are busy and prefer to leave a key in a lockbox or arrange entry instructions. All our cleaners are fully vetted, background-checked, and police-cleared for your absolute peace of mind.'
  },
  {
    id: 2,
    question: 'Do you bring your own cleaning products and equipment?',
    answer: 'Absolutely. Our professional teams come fully equipped with high-quality, eco-friendly cleaning solutions, commercial vacuums, microfiber cloths, and everything required to leave your home sparkling clean.'
  },
  {
    id: 3,
    question: 'How does your 100% Satisfaction Guarantee work?',
    answer: 'Our goal is absolute perfection. If you are not completely satisfied with any area we cleaned, simply contact us within 24 hours. We will dispatch a team back to your home to re-clean the specific area for free.'
  },
  {
    id: 4,
    question: 'What is your End of Lease Bond-Back Guarantee?',
    answer: 'Our End of Lease Clean is custom-built to meet strict real estate standards. If your landlord or agent raises any cleaning concerns within 72 hours of our clean, we will return immediately to fix them at no additional cost to ensure you get your full bond back.'
  },
  {
    id: 5,
    question: 'Can I change or cancel my booking?',
    answer: 'Yes, we offer flexible rescheduling. You can change or cancel your booking free of charge up to 24 hours before your scheduled cleaning slot.'
  }
];
