import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Ticket,
  MapPin,
  Calendar,
  AlertCircle,
  X,
  Lock,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import API from '../services/api';

const CheckoutModal = ({
  isOpen,
  onClose,
  movie,
  cinema,
  showDate,
  showTime,
  selectedSeats,
  unitPrice,
  formattedUnitPrice,
  currencySymbol,
  currencyCode,
  user,
  onBookingSuccess
}) => {
  const [step, setStep] = useState(1); // 1: Details & Summary, 2: Payment, 3: Processing
  const [customerName, setCustomerName] = useState(user?.username || 'VIP Patron');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'patron@imovies.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 234-5678');

  // Payment states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  // Hold Timer (8 minutes = 480 seconds)
  const [timeLeft, setTimeLeft] = useState(480);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setError('');
      setTimeLeft(480);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError('Your seat hold has expired. Please reselect your seats to ensure availability.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const subtotal = selectedSeats.length * unitPrice;
  const bookingFee = Math.round(subtotal * 0.05);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal + bookingFee - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'VIP15' || discountCode.trim().toUpperCase() === 'IMOVIES') {
      setDiscountApplied(true);
      setError('');
    } else {
      setError('Invalid voucher code. Try "VIP15" for 15% VIP discount.');
    }
  };

  const fillTestCredentials = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('08/29');
    setCardCvc('314');
  };

  const handleProcessPayment = async () => {
    if (timeLeft <= 0) {
      setError('Seat hold reservation has expired. Please select seats again.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      // Send payment & booking payload
      const { data } = await API.post('/bookings', {
        movie: movie._id,
        seats: selectedSeats,
        showDate,
        showTime,
        cinema: cinema?.name || movie.theater || 'iMovies IMAX Laser',
        city: cinema?.city || 'New York',
        country: cinema?.country || 'US',
        currency: currencyCode || 'USD',
        seatTier: selectedSeats.some((s) => ['F', 'G', 'H'].includes(s[0])) ? 'VIP Recliner' : 'Standard',
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        },
        paymentMethod: paymentMethod === 'card' ? 'Sandbox Visa (•••• 4242)' : 'Apple Pay / Google Pay'
      });

      onBookingSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment simulation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-[#EAE2D5] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header with Hold Countdown Banner */}
        <div className="bg-[#FFF9F0] border-b border-[#EAE2D5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDECEC] border border-[#FCD7D7] text-[#E63946] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2B2B2B] tracking-tight">
                Secure Checkout & Payment
              </h3>
              <p className="text-[11px] text-[#6B7280]">Step {step} of 2 · 256-bit Encrypted Reservation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Hold Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                timeLeft < 60
                  ? 'bg-[#FDECEC] border-[#FCD7D7] text-[#B81D2D] animate-pulse'
                  : 'bg-[#FFF6DC] border-[#FFEDB0] text-[#7A5B14]'
              }`}
              title="Seats held exclusively for you"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timerFormatted}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#FFF6DC] text-[#6B7280] hover:text-[#2B2B2B] border border-[#EAE2D5] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm bg-white">
          {/* Reservation Overview Strip */}
          <div className="bg-[#FFF9F0] border border-[#EAE2D5] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop&q=85'}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="w-12 h-16 rounded-xl object-cover object-center border border-[#EAE2D5] shrink-0 shadow-xs"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#2B2B2B] truncate">{movie.title}</h4>
                <p className="text-xs text-[#6B7280] flex items-center gap-1.5 truncate mt-0.5">
                  <MapPin className="w-3 h-3 text-[#E63946] shrink-0" />
                  <span>{cinema?.name || movie.theater || 'iMovies VIP Cinema'}</span>
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mt-1">
                  <span>{showDate}</span>
                  <span>·</span>
                  <span className="text-[#E63946] font-bold">{showTime}</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] block mb-1">Seats</span>
              <span className="inline-block px-2.5 py-1 bg-[#FFF6DC] border border-[#FFEDB0] text-[#7A5B14] rounded-lg text-xs font-bold font-mono">
                {selectedSeats.join(', ')}
              </span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-[#FDECEC] border border-[#FCD7D7] text-[#B81D2D] text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#E63946]" />
              <span>{error}</span>
            </div>
          )}

          {step === 1 ? (
            /* STEP 1: Customer Details & Order Summary */
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2B2B] mb-3 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-[#E63946]" />
                  1. Contact & Boarding Pass Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Primary Patron Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:ring-2 focus:ring-[#FFC93C]/30 focus:bg-white rounded-xl px-3.5 py-2 text-[#2B2B2B] text-xs focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Pass Delivery Email *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:ring-2 focus:ring-[#FFC93C]/30 focus:bg-white rounded-xl px-3.5 py-2 text-[#2B2B2B] text-xs focus:outline-none transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Mobile Contact (SMS Confirmation)</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#FFF9F0] border border-[#DCD3C5] focus:border-[#E63946] focus:ring-2 focus:ring-[#FFC93C]/30 focus:bg-white rounded-xl px-3.5 py-2 text-[#2B2B2B] text-xs focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code Entry */}
              <div className="bg-[#FFFDF5] border border-[#FFEDB0] rounded-2xl p-3.5 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. VIP15)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 bg-white border border-[#DCD3C5] rounded-xl px-3 py-1.5 text-xs text-[#2B2B2B] uppercase tracking-wider focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FFC93C] hover:bg-[#E5B129] text-[#1A1D20] text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply Code
                </button>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-[#EAE2D5] text-xs">
                <div className="flex justify-between text-[#6B7280]">
                  <span>
                    Admissions ({selectedSeats.length} × {currencySymbol}
                    {unitPrice})
                  </span>
                  <span className="font-mono text-[#2B2B2B] font-bold">
                    {currencySymbol}
                    {subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Convenience & Laser Projection Surcharge</span>
                  <span className="font-mono text-[#2B2B2B] font-bold">
                    {currencySymbol}
                    {bookingFee}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#047857] font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> VIP Privilege Discount (15%)
                    </span>
                    <span className="font-mono">
                      -{currencySymbol}
                      {discountAmount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-[#EAE2D5] text-sm font-bold text-[#2B2B2B]">
                  <span>Total Due ({currencyCode})</span>
                  <span className="text-xl font-black text-[#E63946] font-mono">
                    {currencySymbol}
                    {finalTotal}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: Simulated Payment Gateway (Test Mode) */
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-[#FFF6DC] border border-[#FFEDB0] rounded-2xl p-3 text-xs text-[#7A5B14]">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#E5B129] shrink-0" />
                  <span>
                    <strong>Sandbox Mode:</strong> Testing simulation mode. Zero actual charges.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={fillTestCredentials}
                  className="text-[11px] underline font-bold text-[#B81D2D] hover:text-[#E63946] shrink-0 ml-2 cursor-pointer"
                >
                  Auto-Fill Test Card
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#FFF6DC] border-[#FFC93C] text-[#2B2B2B] ring-2 ring-[#FFC93C]/40'
                      : 'bg-[#FFF9F0] border-[#EAE2D5] text-[#6B7280] hover:text-[#2B2B2B]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#E63946]" />
                  <div>
                    <p className="text-xs font-bold">Credit / Debit Card</p>
                    <p className="text-[10px] text-[#6B7280]">Visa, Mastercard, Amex</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('digital')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'digital'
                      ? 'bg-[#FFF6DC] border-[#FFC93C] text-[#2B2B2B] ring-2 ring-[#FFC93C]/40'
                      : 'bg-[#FFF9F0] border-[#EAE2D5] text-[#6B7280] hover:text-[#2B2B2B]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#E5B129]" />
                  <div>
                    <p className="text-xs font-bold">Express Digital Pass</p>
                    <p className="text-[10px] text-[#6B7280]">Apple Pay / Google Pay</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3.5 bg-[#FFF9F0] border border-[#EAE2D5] p-4 rounded-2xl">
                  <div>
                    <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Card Number (Sandbox)</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-[#DCD3C5] rounded-xl pl-9 pr-4 py-2 text-[#2B2B2B] font-mono text-xs focus:border-[#E63946] focus:outline-none focus:ring-1 focus:ring-[#E63946]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-[#DCD3C5] rounded-xl px-3 py-2 text-[#2B2B2B] font-mono text-xs focus:border-[#E63946] focus:outline-none text-center focus:ring-1 focus:ring-[#E63946]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2B2B2B] mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-white border border-[#DCD3C5] rounded-xl px-3 py-2 text-[#2B2B2B] font-mono text-xs focus:border-[#E63946] focus:outline-none text-center focus:ring-1 focus:ring-[#E63946]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FFF9F0] border border-[#EAE2D5] p-6 rounded-2xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF6DC] border border-[#FFEDB0] text-[#7A5B14] flex items-center justify-center mx-auto">
                    <Lock className="w-5 h-5 text-[#E5B129]" />
                  </div>
                  <p className="text-xs font-bold text-[#2B2B2B]">Biometric Quick Checkout Ready</p>
                  <p className="text-[11px] text-[#6B7280] max-w-sm mx-auto">
                    Simulated biometric authentication will authorize payment of {currencySymbol}
                    {finalTotal} upon confirmation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#EAE2D5] bg-[#FFF9F0] flex items-center justify-between gap-4">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFF6DC] text-[#2B2B2B] border border-[#EAE2D5] text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel Hold
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!customerName || !customerEmail || timeLeft <= 0}
                className="flex items-center gap-2 bg-[#E63946] hover:bg-[#D62839] disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFF6DC] text-[#2B2B2B] border border-[#EAE2D5] text-xs font-bold transition-colors cursor-pointer"
              >
                Back to Details
              </button>
              <button
                type="button"
                disabled={submitting || timeLeft <= 0}
                onClick={handleProcessPayment}
                className="flex items-center gap-2 bg-[#E63946] hover:bg-[#D62839] disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {submitting
                    ? 'Authorizing Booking...'
                    : `Authorize ${currencySymbol}${finalTotal} (${currencyCode})`}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
