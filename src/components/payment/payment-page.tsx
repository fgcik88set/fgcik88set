"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Users,
  GraduationCap,
  Heart,
  CreditCard,
  Info,
  X,
  Shield,
  Globe,
} from "lucide-react";

export default function PaymentPageDisplay() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = heroRef.current?.querySelectorAll(".animate-item");
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
  };

  const handleGatewaySelect = (gateway: "seerbit" | "paypal") => {
    if (gateway === "seerbit") {
      window.location.href = "/payment/checkout";
    } else if (gateway === "paypal") {
      // TODO: Implement Paystack checkout
      toast.info("Paystack integration coming soon!", {
        description: "We're working on integrating Paystack payments. Please use Seerbit for now.",
        duration: 4000,
      });
    }
    setShowPaymentModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full pb-20 pt-32 bg-gradient-to-br from-darkBlue via-blue-800 to-darkBlue text-white overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          {/* Geometric patterns */}
          <div className="absolute top-20 left-20 w-32 h-32 border-[2px] border-white/10 rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-[2px] border-amber-400/20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="md:hidden text-center text-sm text-mainYellow absolute -top-10 left-2 border-2 border-mainYellow px-4 py-2 rounded-full"
          >
            Go Home
          </Link>
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-item">
              <GraduationCap className="h-16 w-16 mx-auto mb-6 text-mainYellow" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Federal Government College{" "}
                <span className="text-mainYellow">Ikot Ekpene</span>
              </h1>
              <div className="w-32 h-1 mx-auto mb-8 bg-mainYellow"></div>
              <p className="text-2xl md:text-3xl font-semibold mb-4 text-mainYellow">
                Class of 1988
              </p>
              <p className="md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Welcome to our secure payment portal for alumni dues, event
                registrations, and welfare contributions. Supporting our
                community through convenient and secure online payments.
              </p>

              <div className="relative inline-block">
                <button
                  onClick={handlePaymentClick}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg bg-mainYellow text-offBlack"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Make Payment
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="w-full absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50">
                    <div className="bg-white text-offBlack rounded-lg shadow-xl border border-gray-200 p-4 min-w-[280px]">
                      <div className="flex items-center mb-3">
                        <Info className="h-4 w-4 text-mainYellow mr-2" />
                        <h4 className="font-semibold text-sm">
                          Available Payment Types:
                        </h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-mainYellow rounded-full mr-3"></div>
                          <span>Dues and Registration</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-mainYellow rounded-full mr-3"></div>
                          <span>Welfare Payments</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-mainYellow rounded-full mr-3"></div>
                          <span>Other Payments</span>
                        </div>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Categories Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-item">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-darkBlue">
              Payment Categories
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-mainYellow"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our secure payment options designed to support our
              alumni community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-item">
            {/* Alumni Dues Card */}
            <div className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-mainYellow transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <div className="p-6 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-slate-200">
                  <Users className="h-10 w-10 text-darkBlue" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-darkBlue">
                  Alumni Dues
                </h3>
                <p className="text-center leading-relaxed text-offBlack/80">
                  Annual membership dues to support our alumni association
                  activities and programs
                </p>
              </div>
            </div>

            {/* Event Registration Card */}
            <div className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-mainYellow transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <div className="p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(12, 52, 125, 0.1)" }}
                >
                  <GraduationCap className="h-10 w-10 text-darkBlue" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-darkBlue">
                  Event Registration
                </h3>
                <p className="text-center leading-relaxed text-offBlack/80">
                  Registration fees for reunions, homecoming events, and special
                  alumni gatherings
                </p>
              </div>
            </div>

            {/* Welfare Fund Card */}
            <div className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-mainYellow transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <div className="p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(12, 52, 125, 0.1)" }}
                >
                  <Heart className="h-10 w-10 text-darkBlue" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-darkBlue">
                  Welfare Fund
                </h3>
                <p className="text-center leading-relaxed text-offBlack/80">
                  Contributions to support fellow alumni in times of need and
                  community projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Selection Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-darkBlue">
                Choose Payment Method
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              {/* Seerbit Option */}
              <button
                onClick={() => handleGatewaySelect("seerbit")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-mainYellow hover:bg-yellow-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-darkBlue group-hover:text-mainYellow transition-colors">
                        Seerbit Payment(Access Bank)
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      Recommended
                    </div>
                    <div className="text-sm font-medium text-mainYellow">
                      NGN
                    </div>
                  </div>
                </div>
              </button>

              {/* PayPal Option */}
              <button
                onClick={() => handleGatewaySelect("paypal")}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-darkBlue group-hover:text-blue-600 transition-colors">
                        Paystack(Globus Bank)
                      </h4>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  All payments are secured with bank-level encryption
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-8 px-4 bg-darkBlue">
        <p className="text-blue-100">
          Secure payments powered by Seerbit & Paystack • Class of 1988 Alumni
          Association
        </p>
      </div>
    </div>
  );
}
