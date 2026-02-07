import React, { useEffect, useState } from "react";
import { WhatsappLogo, Crown, User } from "@phosphor-icons/react";
import PaymentModal from "./PaymentModal";
import {
  getCountryCurrency,
  convertPrice,
  formatPrice,
  fetchRealTimeRates,
} from "../../utils/currency-config";

interface Plan {
  name: string;
  priceUSD: number;
  icon: React.ComponentType<any>;
  description: string;
  benefits: string[];
  paymentLink: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "The Life Class",
    priceUSD: 1,
    icon: WhatsappLogo,
    description: "Join our exclusive WhatsApp community",
    benefits: [
      "Daily life tips and motivational messages",
      "Exclusive access to community discussions",
      "Supportive network of like-minded individuals",
      "Weekly wisdom and practical insights",
    ],
    paymentLink: "https://paystack.com/pay/thelifeclass",
  },
  {
    name: "The Inner Circle",
    priceUSD: 40,
    icon: Crown,
    description: "Premium access with deeper engagement",
    benefits: [
      "Everything in The Life Class",
      "Monthly group coaching sessions",
      "Direct access to Uju's guidance",
      "Exclusive resource library",
      "Priority community support",
    ],
    paymentLink: "https://paystack.com/pay/innercircle",
    highlighted: true,
  },
  {
    name: "One-on-One",
    priceUSD: 150,
    icon: User,
    description: "Personal transformation with Uju",
    benefits: [
      "Everything in The Inner Circle",
      "1-on-1 personalized coaching sessions",
      "Customized transformation plan",
      "Direct WhatsApp access to Uju",
      "Lifetime support and guidance",
    ],
    paymentLink: "https://paystack.com/pay/oneononecaching",
  },
];

export default function TheLifeClassSection() {
  const [currency, setCurrency] = useState(getCountryCurrency(null));
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [realTimeRates, setRealTimeRates] = useState<{
    [key: string]: number;
  } | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    planName: string;
    priceUSD: number;
  }>({ isOpen: false, planName: "", priceUSD: 0 });

  // Fetch real-time exchange rates on component mount
  useEffect(() => {
    const loadRates = async () => {
      setIsLoadingRates(true);
      try {
        const rates = await fetchRealTimeRates();
        if (rates && Object.keys(rates).length > 0) {
          setRealTimeRates(rates);
        }
      } catch (error) {
        console.error("Failed to load real-time rates:", error);
        // Will fall back to hardcoded rates
      } finally {
        setIsLoadingRates(false);
      }
    };

    loadRates();
  }, []);

  // Detect user location
  useEffect(() => {
    const detectLocation = async () => {
      setIsLoadingLocation(true);
      try {
        const response = await fetch("https://ipwho.is/", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          const code = data.country_code;
          setCountryCode(code);

          // Get currency with real-time rates if available
          const detectedCurrency = getCountryCurrency(
            code,
            realTimeRates || undefined,
          );
          setCurrency(detectedCurrency);
        } else {
          setCurrency(getCountryCurrency(null, realTimeRates || undefined));
          setCountryCode(null);
        }
      } catch (error) {
        console.error("Error detecting location:", error);
        setCurrency(getCountryCurrency(null, realTimeRates || undefined));
        setCountryCode(null);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    detectLocation();
  }, [realTimeRates]);

  const handlePaymentClick = (plan: Plan) => {
    if (countryCode === "NG") {
      setModalState({
        isOpen: true,
        planName: plan.name,
        priceUSD: plan.priceUSD,
      });
    } else {
      window.open(plan.paymentLink, "_blank");
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, planName: "", priceUSD: 0 });
  };

  const isLoading = isLoadingLocation || isLoadingRates;

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Join Uju's Community
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your transformation journey
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Loading pricing in your currency...
            </p>
            <div className="mt-2 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const convertedPrice = convertPrice(plan.priceUSD, currency.rate);
            const displayPrice = formatPrice(
              convertedPrice,
              currency.symbol,
              currency.code,
            );

            return (
              <div
                key={plan.name}
                className={`relative rounded-xl shadow-lg transition-all duration-300 ${
                  plan.highlighted
                    ? "lg:scale-105 bg-gradient-to-br from-amber-50 to-yellow-50 ring-2 ring-amber-400"
                    : "bg-white hover:shadow-xl"
                }`}
              >
                {/* Ribbon for highlighted plan */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col h-full">
                  {/* Icon & Title */}
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full mb-3 sm:mb-4">
                      <Icon
                        size={28}
                        weight="bold"
                        className="text-blue-600 sm:w-8 sm:h-8"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                      {displayPrice}
                    </div>
                    {plan.priceUSD === 1 ? (
                      <p className="text-xs sm:text-sm text-gray-600 mt-2">
                        and above
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-600 mt-2">
                        per month
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {currency.code}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="flex-grow mb-6 sm:mb-8">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                      What you'll get:
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {plan.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <span className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm text-gray-700">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePaymentClick(plan)}
                    disabled={isLoading}
                    className={`w-full inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                      isLoading
                        ? "opacity-60 cursor-not-allowed"
                        : plan.highlighted
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-xl"
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {isLoading ? "Loading..." : "Get Started"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <p className="text-xs sm:text-sm text-gray-600">
            {countryCode === "NG"
              ? "Secure payment via bank transfer"
              : `Secure payment in ${currency.code}`}
          </p>
          {realTimeRates && (
            <p className="text-xs text-gray-500 mt-1">
              Exchange rates updated in real-time
            </p>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        planName={modalState.planName}
        priceUSD={modalState.priceUSD}
        realTimeRates={realTimeRates}
      />
    </section>
  );
}
