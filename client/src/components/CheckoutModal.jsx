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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#12151d] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/95 flex flex-col max-h-[92vh]">
        {/* Header with Hold Countdown Banner */}
        <div className="bg-[#161a24] border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Cinzel',serif] tracking-wide">
                Secure Checkout & Payment
              </h3>
              <p className="text-[11px] text-slate-400">Step {step} of 2 · 256-bit Encrypted Reservation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Hold Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${
                timeLeft < 60
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}
              title="Seats held exclusively for you"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timerFormatted}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Reservation Overview Strip */}
          <div className="bg-[#0b0e14] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200'}
                alt={movie.title}
                className="w-12 h-16 rounded-lg object-cover border border-amber-500/25 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{movie.title}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 truncate">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{cinema?.name || movie.theater || 'iMovies VIP Cinema'}</span>
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span>{showDate}</span>
                  <span>·</span>
                  <span className="text-amber-300 font-bold">{showTime}</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Seats</span>
              <span className="text-sm font-bold font-mono text-amber-400">{selectedSeats.join(', ')}</span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {step === 1 ? (
            /* STEP 1: Customer Details & Order Summary */
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  1. Contact & Boarding Pass Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Primary Patron Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#0a0c10] border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Pass Delivery Email *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#0a0c10] border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-400 mb-1">Mobile Contact (SMS Confirmation)</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#0a0c10] border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code Entry */}
              <div className="bg-[#0e1118] border border-slate-800 rounded-xl p-3.5 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. VIP15)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 bg-[#090b10] border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold border border-amber-500/30"
                >
                  Apply Code
                </button>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>
                    Admissions ({selectedSeats.length} × {currencySymbol}
                    {unitPrice})
                  </span>
                  <span className="font-mono text-white">
                    {currencySymbol}
                    {subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Convenience & Laser Projection Surcharge</span>
                  <span className="font-mono text-white">
                    {currencySymbol}
                    {bookingFee}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> VIP Privilege Discount (15%)
                    </span>
                    <span className="font-mono">
                      -{currencySymbol}
                      {discountAmount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                  <span>Total Due ({currencyCode})</span>
                  <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-mono">
                    {currencySymbol}
                    {finalTotal}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: Simulated Payment Gateway (Test Mode) */
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Sandbox Mode:</strong> Testing simulation mode. Zero actual charges.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={fillTestCredentials}
                  className="text-[11px] underline font-bold hover:text-white shrink-0 ml-2"
                >
                  Auto-Fill Test Card
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/15 border-amber-500 text-white'
                      : 'bg-[#0d1017] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs font-bold">Credit / Debit Card</p>
                    <p className="text-[10px] text-slate-400">Visa, Mastercard, Amex</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('digital')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                    paymentMethod === 'digital'
                      ? 'bg-amber-500/15 border-amber-500 text-white'
                      : 'bg-[#0d1017] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs font-bold">Express Digital Pass</p>
                    <p className="text-[10px] text-slate-400">Apple Pay / Google Pay</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3.5 bg-[#0a0c10] border border-slate-800/80 p-4 rounded-2xl">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Card Number (Sandbox)</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#12151d] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-white font-mono text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#12151d] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-amber-400 focus:outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#12151d] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-amber-400 focus:outline-none text-center"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0a0c10] border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                    <Lock className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-white">Biometric Quick Checkout Ready</p>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                    Simulated biometric authentication will authorize payment of {currencySymbol}
                    {finalTotal} upon confirmation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800/80 bg-[#141822] flex items-center justify-between gap-4">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel Hold
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!customerName || !customerEmail || timeLeft <= 0}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/20"
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
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Back to Details
              </button>
              <button
                type="button"
                disabled={submitting || timeLeft <= 0}
                onClick={handleProcessPayment}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/25"
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
