import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";

export default function TheLifeClassSection() {
  const handlePaymentRedirect = () => {
    window.open("https://paystack.com/pay/thelifeclass", "_blank");
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-3 sm:mb-4">
            <WhatsappLogo
              size={24}
              weight="bold"
              className="text-green-500 sm:w-8 sm:h-8"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            The Life Class
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Exclusive WhatsApp Community
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                What is The Life Class?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The Life Class is an exclusive WhatsApp community designed to
                bring together individuals seeking personal growth, wisdom, and
                meaningful connections. Join us for daily insights, practical
                life lessons, and supportive discussions that empower you to
                live your best life.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                What You'll Get:
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-green-500 font-bold">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base text-gray-700">
                    Daily life tips and motivational messages
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-green-500 font-bold">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base text-gray-700">
                    Exclusive access to community discussions
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-green-500 font-bold">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base text-gray-700">
                    Direct guidance and support
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-green-500 font-bold">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base text-gray-700">
                    Networking with like-minded individuals
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-700">
                <span className="font-semibold">Limited Access:</span>{" "}
                Membership starts from just $1, giving you immediate access to
                our vibrant community and all the benefits.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button
            onClick={handlePaymentRedirect}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm sm:text-lg rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 gap-2"
          >
            <WhatsappLogo size={20} weight="bold" className="sm:w-6 sm:h-6" />
            <span>Join The Life Class - From $1</span>
          </button>
          <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
            Secure payment powered by Paystack
          </p>
        </div>
      </div>
    </section>
  );
}
