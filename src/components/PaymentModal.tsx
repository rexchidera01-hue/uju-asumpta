import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  getCountryCurrency,
  convertPrice,
  formatPrice,
} from "../../utils/currency-config";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  priceUSD: number;
  realTimeRates?: { [key: string]: number } | null;
}

const NIGERIA_VAT_RATE = 0.075; // 7.5% VAT for Nigeria

export default function PaymentModal({
  isOpen,
  onClose,
  planName,
  priceUSD,
  realTimeRates,
}: PaymentModalProps) {
  const [step, setStep] = useState<"pricing" | "payment">("pricing");
  const [vatAmount, setVatAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currency, setCurrency] = useState(
    getCountryCurrency("NG", realTimeRates || undefined),
  ); // Default to NGN for modal

  // Reset step to "pricing" whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("pricing");
    }
  }, [isOpen]);

  // Update currency when real-time rates change
  useEffect(() => {
    const updatedCurrency = getCountryCurrency(
      "NG",
      realTimeRates || undefined,
    );
    setCurrency(updatedCurrency);
  }, [realTimeRates]);

  // Calculate VAT and total for Nigerian Naira
  useEffect(() => {
    try {
      const priceInNGN = convertPrice(priceUSD, currency.rate);
      const vat = Math.round(priceInNGN * NIGERIA_VAT_RATE);
      const total = priceInNGN + vat;
      setVatAmount(vat);
      setTotalPrice(total);
    } catch (error) {
      console.error("Error calculating price:", error);
      setVatAmount(0);
      setTotalPrice(0);
    }
  }, [priceUSD, currency]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {step === "pricing" ? "Order Summary" : "Payment Details"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {step === "pricing" ? (
            // Pricing Step
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {planName}
                </h3>

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Base Price:</span>
                    <span className="font-medium">
                      {formatPrice(
                        convertPrice(priceUSD, currency.rate),
                        currency.symbol,
                        currency.code,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>VAT (7.5%):</span>
                    <span className="font-medium">
                      {formatPrice(vatAmount, currency.symbol, currency.code)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-semibold text-gray-900">
                      Total Price:
                    </span>
                    <span className="font-bold text-lg text-blue-600">
                      {formatPrice(totalPrice, currency.symbol, currency.code)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                VAT is calculated at the current Nigerian rate and is included
                in your total price.
              </p>

              {/* Real-time rates indicator */}
              {currency.rate !== 1500 && (
                <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                  ✓ Using real-time exchange rates
                </p>
              )}
            </div>
          ) : (
            // Payment Step
            <div className="space-y-4">
              {/* Total Price Display */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-xs text-gray-600 mb-1">Total Amount:</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {formatPrice(totalPrice, currency.symbol, currency.code)}
                </p>
              </div>

              {/* Bank Details */}
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Bank Name
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900">
                    Zenith Bank
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Account Number
                  </p>
                  <p className="text-base sm:text-lg font-mono font-semibold text-gray-900">
                    1234567890
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("1234567890");
                      alert("Account number copied to clipboard!");
                    }}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Copy Account Number
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Account Name
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900">
                    Uju Asumpta
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  <span className="font-semibold">Note:</span> Please transfer
                  the exact amount and send proof of payment to confirm your
                  subscription.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
          <div className="flex gap-3">
            {step === "payment" && (
              <button
                onClick={() => setStep("pricing")}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step === "pricing") {
                  setStep("payment");
                } else {
                  onClose();
                }
              }}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
            >
              {step === "pricing" ? "Continue" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
