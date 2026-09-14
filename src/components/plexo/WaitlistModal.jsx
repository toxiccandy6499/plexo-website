import React, { useState } from 'react';
import { X, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { DoodleCrown } from './Doodles';
import { submitWaitlistEntry } from '../../lib/supabaseClient';

export function WaitlistModal({ isOpen, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('Student');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(1482);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!fullName || !email || !phone || !age) return;

    setIsLoading(true);
    try {
      const result = await submitWaitlistEntry({
        fullName,
        email,
        phone,
        age,
        occupation,
        honeypot
      });

      if (result.success) {
        setWaitlistNumber(result.waitlistNumber);
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setAge('');
    setOccupation('Student');
    setHoneypot('');
    setErrorMessage('');
    onClose();
  };

  const occupations = ['Student', 'Working Individual', 'Other'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] border-2 border-black rounded-[32px] p-6 sm:p-8 shadow-[6px_8px_0px_#000000] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-black bg-white flex items-center justify-center text-black hover:bg-neutral-100 transition-colors shadow-2xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <DoodleCrown className="w-6 h-5 text-plexo-red" />
              <span className="font-plexo-mono text-xs font-bold uppercase tracking-wider text-neutral-600">
                VIP Early Access
              </span>
            </div>

            <h3 className="font-plexo-headline text-3xl text-black tracking-tight leading-tight uppercase mb-2">
              CLAIM YOUR SPOT.
            </h3>

            <p className="text-xs text-neutral-600 font-medium mb-5 leading-relaxed">
              Join 12,000+ members getting real cards, UPI roundups, and exclusive rewards before anyone else.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullNameInput" className="block text-xs font-bold text-neutral-800 mb-1">
                  Full Name
                </label>
                <input
                  id="fullNameInput"
                  type="text"
                  required
                  placeholder="e.g. Maya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium transition-colors"
                />
              </div>

              {/* Email ID */}
              <div>
                <label htmlFor="emailInput" className="block text-xs font-bold text-neutral-800 mb-1">
                  Email ID
                </label>
                <input
                  id="emailInput"
                  type="email"
                  required
                  placeholder="maya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium transition-colors"
                />
              </div>

              {/* Phone No & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="phoneInput" className="block text-xs font-bold text-neutral-800 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phoneInput"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="ageInput" className="block text-xs font-bold text-neutral-800 mb-1">
                    Age
                  </label>
                  <input
                    id="ageInput"
                    type="number"
                    min="13"
                    max="100"
                    required
                    placeholder="20"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-medium transition-colors"
                  />
                </div>
              </div>

              {/* Occupation Status: Student / Working Individual / Other */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                  I am a:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {occupations.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setOccupation(item)}
                      className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer font-bold leading-tight ${
                        occupation === item
                          ? 'border-black bg-[#FFE600] text-black shadow-[1px_2px_0px_#000000]'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Invisible Honeypot field (Spam & bot trap) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website_honeypot_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Error Message Banner */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FFE600] hover:bg-[#FFDF00] disabled:bg-neutral-200 disabled:text-neutral-500 text-black font-black text-sm py-3.5 rounded-full shadow-[2px_3px_0px_#000000] disabled:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Securing Your Spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Early Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center space-y-4">
            <div className="w-16 h-16 bg-[#FFE600] border-2 border-black rounded-full mx-auto flex items-center justify-center text-3xl shadow-md">
              🎉
            </div>

            <div>
              <h3 className="font-plexo-headline text-3xl text-black tracking-tight uppercase">
                YOU'RE ON THE LIST!
              </h3>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Spot reserved for <span className="font-bold text-black">{fullName}</span> ({occupation}).
              </p>
            </div>

            <div className="bg-white border-2 border-black p-4 rounded-2xl shadow-xs inline-block">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Your Queue Number</span>
              <span className="font-plexo-mono text-3xl font-black text-plexo-red">
                #{waitlistNumber}
              </span>
            </div>

            <p className="text-xs text-neutral-500 font-medium">
              We just sent a confirmation to <span className="font-bold text-black">{email}</span> and SMS to <span className="font-bold text-black">{phone}</span>.
            </p>

            <div>
              <button
                onClick={handleReset}
                className="bg-black text-white font-bold text-xs px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
