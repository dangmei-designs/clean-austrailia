/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Home,
  Check,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Flame,
  Layers,
  Grid,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Printer,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { SERVICE_PACKAGES, EXTRAS_LIST } from '../data';
import { BookingFormData } from '../types';

interface BookingFormProps {
  selectedServiceId: 'regular' | 'deep' | 'lease';
  onChangeServiceId: (id: 'regular' | 'deep' | 'lease') => void;
}

export default function BookingForm({ selectedServiceId, onChangeServiceId }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    postcode: '',
    bedrooms: 2,
    bathrooms: 1,
    frequency: 'fortnightly',
    selectedService: selectedServiceId,
    extras: {
      insideOven: false,
      insideFridge: false,
      windows: false,
      balcony: false,
      cabinets: false,
    },
    date: '',
    timeSlot: 'morning',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Keep state synchronized if selectedServiceId changes from parent
  useEffect(() => {
    setFormData((prev) => ({ ...prev, selectedService: selectedServiceId }));
  }, [selectedServiceId]);

  // Handle direct changes from local form tabs
  const handleServiceTabChange = (id: 'regular' | 'deep' | 'lease') => {
    onChangeServiceId(id);
    setFormData((prev) => ({ ...prev, selectedService: id }));
  };

  const handleBedroomChange = (val: number) => {
    setFormData((prev) => ({ ...prev, bedrooms: Math.max(1, Math.min(10, val)) }));
  };

  const handleBathroomChange = (val: number) => {
    setFormData((prev) => ({ ...prev, bathrooms: Math.max(1, Math.min(6, val)) }));
  };

  const toggleExtra = (extraId: string) => {
    setFormData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extraId]: !prev.extras[extraId as keyof typeof prev.extras],
      },
    }));
  };

  const calculatePrice = () => {
    const service = SERVICE_PACKAGES.find((p) => p.id === formData.selectedService);
    if (!service) return { subtotal: 0, discount: 0, total: 0 };

    // Base price includes 1 bed + 1 bath
    const bedCost = Math.max(0, formData.bedrooms - 1) * service.pricePerBed;
    const bathCost = Math.max(0, formData.bathrooms - 1) * service.pricePerBath;

    let subtotal = service.basePrice + bedCost + bathCost;

    // Extras
    if (formData.extras.insideOven) subtotal += 45;
    if (formData.extras.insideFridge) subtotal += 35;
    if (formData.extras.windows) subtotal += 60;
    if (formData.extras.balcony) subtotal += 30;
    if (formData.extras.cabinets) subtotal += 40;

    // Frequency Discount
    let discount = 0;
    if (formData.frequency === 'weekly') {
      discount = subtotal * 0.20;
    } else if (formData.frequency === 'fortnightly') {
      discount = subtotal * 0.15;
    }

    return {
      subtotal: Math.round(subtotal),
      discount: Math.round(discount),
      total: Math.round(subtotal - discount),
    };
  };

  const pricing = calculatePrice();

  // Simple validation for each step
  const validateStep = (currentStep: number) => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.postcode) {
        errors.postcode = 'Required';
      } else if (!/^\d{4}$/.test(formData.postcode)) {
        errors.postcode = 'Must be 4 digits';
      }
      if (!formData.date) {
        errors.date = 'Required';
      } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          errors.date = 'Must be today or future';
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.fullName.trim()) errors.fullName = 'Name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Invalid email';
      }
      if (!formData.phone.trim()) {
        errors.phone = 'Phone is required';
      } else if (!/^(04\d{8}|05\d{8}|\+614\d{8})$/.test(formData.phone.replace(/[\s-]/g, ''))) {
        errors.phone = 'Invalid AU mobile';
      }
      if (!formData.address.trim()) errors.address = 'Address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const code = `CA-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingCode(code);
      setIsSubmitting(false);
      setStep(3); // Success Screen
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({
      postcode: '',
      bedrooms: 2,
      bathrooms: 1,
      frequency: 'once',
      selectedService: 'regular',
      extras: {
        insideOven: false,
        insideFridge: false,
        windows: false,
        balcony: false,
        cabinets: false,
      },
      date: '',
      timeSlot: 'morning',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      specialInstructions: '',
    });
    setStep(1);
    setFormErrors({});
  };

  const handlePrint = () => {
    window.print();
  };

  // Get Extra Icon Helper
  const getExtraIcon = (id: string) => {
    switch (id) {
      case 'insideOven':
        return <Flame className="w-3.5 h-3.5" />;
      case 'insideFridge':
        return <Check className="w-3.5 h-3.5" />;
      case 'windows':
        return <Layers className="w-3.5 h-3.5" />;
      case 'balcony':
        return <Grid className="w-3.5 h-3.5" />;
      case 'cabinets':
        return <FolderOpen className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      id="booking-form-wrapper"
      className="bg-clean-navy border border-slate-700/60 shadow-2xl rounded-2xl p-4 sm:p-6 text-clean-white"
    >
      {/* Form Progress Indicator */}
      {step < 3 && (
        <div className="mb-4">
          <div className="flex justify-between text-center items-center text-[11px] font-bold text-slate-400 mb-1.5">
            <span className={step >= 1 ? 'text-clean-white' : ''}>1. Customize Clean</span>
            <span className={step >= 2 ? 'text-clean-white' : ''}>2. Contact Details</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-clean-mint h-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Customize Quote Parameters */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-clean-white">Get Your Instant Price</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Quick, simple, and flat-rate pricing.
              </p>
            </div>

            {/* Service Type Switcher */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                Select Service
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-800/80 p-1 rounded-xl">
                {(['regular', 'deep', 'lease'] as const).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleServiceTabChange(id)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all capitalize focus:outline-none ${
                      formData.selectedService === id
                        ? 'bg-clean-mint text-clean-navy shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {id === 'lease' ? 'Bond' : id}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Count Adjusters - Side-by-side to save vertical space */}
            <div className="grid grid-cols-2 gap-3">
              {/* Bedrooms */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  Bedrooms
                </label>
                <div className="flex items-center justify-between border border-slate-700/80 rounded-xl p-1 bg-slate-800/40">
                  <button
                    type="button"
                    onClick={() => handleBedroomChange(formData.bedrooms - 1)}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center font-bold text-white active:scale-95 transition-all focus:outline-none text-xs"
                  >
                    -
                  </button>
                  <span className="font-display font-bold text-xs text-white">
                    {formData.bedrooms} {formData.bedrooms === 1 ? 'Bed' : 'Beds'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBedroomChange(formData.bedrooms + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center font-bold text-white active:scale-95 transition-all focus:outline-none text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  Bathrooms
                </label>
                <div className="flex items-center justify-between border border-slate-700/80 rounded-xl p-1 bg-slate-800/40">
                  <button
                    type="button"
                    onClick={() => handleBathroomChange(formData.bathrooms - 1)}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center font-bold text-white active:scale-95 transition-all focus:outline-none text-xs"
                  >
                    -
                  </button>
                  <span className="font-display font-bold text-xs text-white">
                    {formData.bathrooms} {formData.bathrooms === 1 ? 'Bath' : 'Baths'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBathroomChange(formData.bathrooms + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center font-bold text-white active:scale-95 transition-all focus:outline-none text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Date & Postcode - Side-by-side to save vertical space */}
            <div className="grid grid-cols-2 gap-3">
              {/* Postcode */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  Postcode
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. 2000"
                    maxLength={4}
                    value={formData.postcode}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, postcode: e.target.value.replace(/\D/g, '') }))
                    }
                    className={`w-full bg-slate-800/50 border pl-9 pr-3 py-2 rounded-xl text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-clean-mint/50 ${
                      formErrors.postcode ? 'border-red-500 bg-red-950/30' : 'border-slate-700/80'
                    }`}
                  />
                </div>
                {formErrors.postcode && (
                  <p className="text-[10px] text-red-400 font-medium leading-none mt-0.5">
                    {formErrors.postcode}
                  </p>
                )}
              </div>

              {/* Date Picker */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className={`w-full bg-slate-800/50 border pl-9 pr-3 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-clean-mint/50 ${
                      formErrors.date ? 'border-red-500 bg-red-950/30' : 'border-slate-700/80'
                    }`}
                  />
                </div>
                {formErrors.date && (
                  <p className="text-[10px] text-red-400 font-medium leading-none mt-0.5">
                    {formErrors.date}
                  </p>
                )}
              </div>
            </div>

            {/* Extras - Shown as compact small checkable pills/tags to save space */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                Add Premium Extras (Optional)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {EXTRAS_LIST.map((extra) => {
                  const isChecked = formData.extras[extra.id as keyof typeof formData.extras];
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] transition-all focus:outline-none ${
                        isChecked
                          ? 'border-clean-mint bg-clean-mint/20 text-white font-bold shadow-sm'
                          : 'border-slate-700/60 hover:border-slate-600 bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <span className={isChecked ? 'text-clean-mint' : 'text-slate-400'}>
                        {getExtraIcon(extra.id)}
                      </span>
                      <span>{extra.name}</span>
                      <span className="text-[9px] opacity-80 font-medium text-slate-400">
                        (+${extra.price})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instant Price Total */}
            <div className="bg-slate-800/40 text-clean-white rounded-xl p-3 border border-slate-700/60 shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-medium">Estimated Pricing Total:</span>
                <span className="text-lg font-display font-black text-clean-mint">
                  ${pricing.total}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-clean-mint hover:bg-clean-mint-dark text-clean-navy py-3 rounded-xl font-display font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-1.5 focus:outline-none"
            >
              Continue to Details
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* STEP 2: Contact & Address Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="font-display font-bold text-base sm:text-lg text-clean-white">Secure Your Booking</h3>
              </div>
              <p className="text-xs text-slate-400 ml-7">
                Enter your details to finalize your cleaning reservation.
              </p>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-3">
              {/* Full Name & Phone - Side-by-side to save space */}
              <div className="grid grid-cols-2 gap-3">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Smith"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className={`w-full bg-slate-800/50 border pl-9 pr-3 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-clean-mint/50 ${
                        formErrors.fullName ? 'border-red-500 bg-red-950/30' : 'border-slate-700/80'
                      }`}
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="text-[10px] text-red-400 font-medium leading-none mt-0.5">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0400 123 456"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className={`w-full bg-slate-800/50 border pl-9 pr-3 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-clean-mint/50 ${
                        formErrors.phone ? 'border-red-500 bg-red-950/30' : 'border-slate-700/80'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-[10px] text-red-400 font-medium leading-none mt-0.5">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. liam@example.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className={`w-full bg-slate-800/50 border pl-9 pr-3 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-clean-mint/50 ${
                      formErrors.email ? 'border-red-500 bg-red-950/30' : 'border-slate-700/80'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[10px] text-red-400 font-medium leading-none mt-0.5">{formErrors.email}</p>
                )}
              </div>

              {/* Street Address */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 123 Pitt St, Sydney"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    className={`w-full bg-slate-800/50 border pl-9 pr-3 py-2 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-clean-mint/50 ${
                      formErrors.address ? 'border-red-500 bg-red-950/30' : 'border-slate-700/80'
                    }`}
                  />
                </div>
                {formErrors.address && (
                  <p className="text-[10px] text-red-400 font-medium leading-none mt-0.5">{formErrors.address}</p>
                )}
              </div>

              {/* Price Tag & Terms Notice */}
              <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">
                    DUE AFTER CLEAN
                  </span>
                  <p className="text-base font-display font-bold text-clean-mint mt-0.5">${pricing.total}</p>
                </div>
                <div className="text-[9px] text-slate-400 text-right leading-tight max-w-[170px]">
                  Zero charges processed until clean completes.
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="col-span-1 border border-slate-700 hover:bg-slate-800/60 text-slate-300 py-2.5 rounded-xl font-display font-bold text-xs transition-all focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="col-span-2 bg-clean-mint hover:bg-clean-mint-dark text-clean-navy py-2.5 rounded-xl font-display font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-1.5 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1 font-bold text-xs">
                      <span className="w-3.5 h-3.5 border-2 border-clean-navy border-t-transparent rounded-full animate-spin" />
                      Securing...
                    </span>
                  ) : (
                    <>
                      Confirm & Book Clean
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 3: Success Screen */}
        {step === 3 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4 py-2"
          >
            {/* Visual Checkmark */}
            <div className="flex justify-center">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full border-4 border-emerald-100 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-clean-white">
                Booking Confirmed!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-bold">{formData.fullName}</span>! Your cleaning slot
                is scheduled. A confirmation email and text are on the way.
              </p>
            </div>

            {/* Receipt Summary Details */}
            <div
              id="printable-receipt"
              className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 text-left text-xs text-slate-300 space-y-2.5 shadow-sm"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">
                    RESERVATION CODE
                  </span>
                  <span className="font-mono font-bold text-xs text-clean-mint">{bookingCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">
                    STATUS
                  </span>
                  <span className="bg-emerald-500/20 text-clean-mint text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Assigned
                  </span>
                </div>
              </div>

              {/* Service & Home Summary */}
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-700 text-[10px]">
                <div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase block">
                    SERVICE LEVEL
                  </span>
                  <span className="font-bold text-clean-white capitalize">
                    {formData.selectedService} Clean
                  </span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase block">
                    HOME CONFIG
                  </span>
                  <span className="font-bold text-clean-white">
                    {formData.bedrooms} Bed, {formData.bathrooms} Bath
                  </span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-700 text-[10px]">
                <div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase block">
                    SCHEDULED DATE
                  </span>
                  <span className="font-bold text-clean-white flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    {formData.date}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 font-bold uppercase block">
                    ARRIVAL WINDOW
                  </span>
                  <span className="font-bold text-clean-white capitalize flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    Morning (8am-12pm)
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="text-[10px] pb-2 border-b border-slate-700">
                <span className="text-[8px] text-slate-400 font-bold uppercase block">
                  ADDRESS & POSTCODE
                </span>
                <span className="font-semibold text-clean-white block mt-0.5">
                  {formData.address} (Postcode: {formData.postcode})
                </span>
              </div>

              {/* Extras Details */}
              {Object.values(formData.extras).some(Boolean) && (
                <div className="pb-2 border-b border-slate-700 text-[10px]">
                  <span className="text-[8px] text-slate-400 font-bold uppercase block mb-1">
                    ACTIVE EXTRAS
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {EXTRAS_LIST.map(
                      (extra) =>
                        formData.extras[extra.id as keyof typeof formData.extras] && (
                          <span
                            key={extra.id}
                            className="bg-slate-750 text-clean-white text-[9px] font-semibold px-1.5 py-0.5 rounded"
                          >
                            {extra.name}
                          </span>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="space-y-1 pt-1 text-[10px]">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal (Base & Extras)</span>
                  <span>${pricing.subtotal}</span>
                </div>
                <div className="flex justify-between font-display font-bold text-xs text-clean-mint pt-1.5 border-t border-slate-700 border-dashed">
                  <span>Grand Total (Incl. GST)</span>
                  <span>${pricing.total}</span>
                </div>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full bg-slate-800 hover:bg-slate-750 text-clean-white font-display font-bold text-[11px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Confirmation
              </button>
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full bg-clean-mint hover:bg-clean-mint-dark text-clean-navy font-display font-bold text-[11px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                Book Another Home
                <Home className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
