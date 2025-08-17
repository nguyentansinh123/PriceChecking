import Footer from "@/comps/HomeCMTS/Footer";
import Navbar from "@/comps/HomeCMTS/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import useAuthUser from "@/hooks/AuthHooks/useAuthUser";

import personalInfo from "../../assets/personal-info.png";
import loginSecurity from "../../assets/login-security.png";
import payments from "../../assets/payments.png";
import themes from "../../assets/themes.png";
import notifications from "../../assets/notifications.png";
import privacy from "../../assets/privacy.png";
import preferences from "../../assets/preferences.png";
import languages from "../../assets/languages.png";
import hosting from "../../assets/hosting.png";
import referral from "../../assets/referral.png";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  to: string;
}

const AccountCard: React.FC<CardProps> = ({ icon, title, description, to }) => (
  <Link
    to={to}
    className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex flex-col gap-3">
      <img src={icon} alt={`${title} icon`} className="w-6 h-6" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </Link>
);

const AccountPage: React.FC = () => {
  const { authUser } = useAuthUser();

  const cards: CardProps[] = [
    {
      icon: personalInfo,
      title: "Personal info",
      description: "Provide personal details and how we can reach you",
      to: "/account/personal-info",
    },
    {
      icon: loginSecurity,
      title: "Login & security",
      description: "Update your password and secure your account",
      to: "/account/login-security",
    },
    {
      icon: payments,
      title: "Payments & payouts",
      description: "Review payments, payouts, coupons, and gift cards",
      to: "/account/payments-payouts",
    },
    {
      icon: themes,
      title: "Themes",
      description: "Manage taxpayer information and tax documents",
      to: "/account/themes",
    },
    {
      icon: notifications,
      title: "Notifications",
      description:
        "Choose notification preferences and how you want to be contacted",
      to: "/account/notifications",
    },
    {
      icon: privacy,
      title: "Privacy & sharing",
      description:
        "Manage your personal data, connected services, and data sharing settings",
      to: "/account/privacy-sharing",
    },
    {
      icon: preferences,
      title: "Global preferences",
      description: "Set your default language, currency, and timezone",
      to: "/account/global-preferences",
    },
    {
      icon: languages,
      title: "Languages",
      description: "Add a work email for business trip benefits",
      to: "/account/languages",
    },
    {
      icon: hosting,
      title: "Professional hosting tools",
      description:
        "Get professional tools if you manage several properties on Airbnb",
      to: "/account/hosting",
    },
    {
      icon: referral,
      title: "Referral credit & coupon",
      description: "You have $0 referral credits and coupon. Learn more.",
      to: "/account/referral-credit-coupon",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <header className="mt-10 mb-12">
            <h1 className="text-4xl font-bold mb-2">Account</h1>
            {authUser?.user && (
              <p className="text-lg text-gray-600">
                <span className="font-semibold">{authUser.user.name}</span>,{" "}
                {authUser.user.email} ·{" "}
                <Link
                  to="/account/personal-info"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Go to profile
                </Link>
              </p>
            )}
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <AccountCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
