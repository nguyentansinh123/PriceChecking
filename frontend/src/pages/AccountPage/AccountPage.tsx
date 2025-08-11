import Footer from '@/comps/HomeCMTS/Footer';
import Navbar from '@/comps/HomeCMTS/Navbar';
import React from 'react';


import personalInfo from '../../assets/personal-info.png';
import loginSecurity from '../../assets/login-security.png';
import payments from '../../assets/payments.png';
import themes from '../../assets/themes.png';
import notifications from '../../assets/notifications.png';
import privacy from '../../assets/privacy.png';
import preferences from '../../assets/preferences.png';
import languages from '../../assets/languages.png';
import hosting from '../../assets/hosting.png';
import referral from '../../assets/referral.png';


interface Card {
  icon: string;
  title: string;
  description: string;
  to: string;
}

const AccountCard: React.FC<Card> = ({ icon, title, description, to }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-3 w-full max-w-sm hover:shadow-lg transition">
    <img src={icon} alt={title} className="w-6 h-6" />
    <h3 className="text-md font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const AccountPage: React.FC = () => {
  const cards: Card[] = [
    {
      icon: personalInfo,
      title: 'Personal info',
      description: 'Provide personal details and how we can reach you',
      to: '/account/personal-info',
    },
    {
      icon: loginSecurity,
      title: 'Login & security',
      description: 'Update your password and secure your account',
      to: '/account/login-security',
    },
    {
      icon: payments,
      title: 'Payments & payouts',
      description: 'Review payments, payouts, coupons, and gift cards',
      to: '/account/payments-payouts',
    },
    {
      icon: themes,
      title: 'Themes',
      description: 'Manage taxpayer information and tax documents',
      to: '/account/themes',
    },
    {
      icon: notifications,
      title: 'Notifications',
      description: 'Choose notification preferences and how you want to be contacted',
      to: '/account/notifications',
    },
    {
      icon: privacy,
      title: 'Privacy & sharing',
      description: 'Manage your personal data, connected services, and data sharing settings',
      to: '/account/privacy-sharing',
    },
    {
      icon: preferences,
      title: 'Global preferences',
      description: 'Set your default language, currency, and timezone',
      to: '/account/global-preferences',
    },
    {
      icon: languages,
      title: 'Languages',
      description: 'Add a work email for business trip benefits',
      to: '/account/languages',
    },
    {
      icon: hosting,
      title: 'Professional hosting tools',
      description: 'Get professional tools if you manage several properties on Airbnb',
      to: '/account/hosting',
    },
    {
      icon: referral,
      title: 'Referral credit & coupon',
      description: 'You have $0 referral credits and coupon. Learn more.',
      to: '/account/referral-credit-coupon',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 overflow-hidden">
        <div className="w-4/5 mx-auto space-y-15">

          <Navbar />

          <div className='flex flex-col items-center mb-10'>

            <h1 className="text-4xl font-bold mb-10">Account</h1>
            <p className="text-xl text-gray-600 mb-10">
              <span className="font-semibold">Peter griffin</span>, hello@designdrops.io ·{' '}
              <a href="#" className="text-blue-500 underline">Go to profile</a>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cards.map((card, idx) => (
                <AccountCard key={idx} {...card} />
              ))}
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AccountPage;
