/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BookingFormData {
  postcode: string;
  bedrooms: number;
  bathrooms: number;
  frequency: 'once' | 'weekly' | 'fortnightly';
  selectedService: 'regular' | 'deep' | 'lease';
  extras: {
    insideOven: boolean;
    insideFridge: boolean;
    windows: boolean;
    balcony: boolean;
    cabinets: boolean;
  };
  date: string;
  timeSlot: 'morning' | 'afternoon' | 'late';
  fullName: string;
  email: string;
  phone: string;
  address: string;
  specialInstructions: string;
}

export interface ServicePackage {
  id: 'regular' | 'deep' | 'lease';
  name: string;
  tagline: string;
  basePrice: number;
  pricePerBed: number;
  pricePerBath: number;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  serviceType: string;
  date: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
