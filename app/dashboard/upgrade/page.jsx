import React from 'react';

const plans = [
  {
    name: 'Free',
    price: '0$',
    period: '/month',
    features: [
      { text: 'Create 3 Free Mock Interview', included: true },
      { text: 'Unlimited Retake Interview', included: true },
      { text: 'Practice Question', included: false },
      { text: 'Tubeguruji.Com Exclusive App Access', included: false },
      { text: 'Email Support', included: false },
    ],
    button: 'Get Started',
  },
  {
    name: 'Monthly',
    price: '7.99$',
    period: '/month',
    features: [
      { text: 'Create 3 Free Mock Interview', included: true },
      { text: 'Unlimited Retake Interview', included: true },
      { text: 'Practice Question', included: true },
      { text: 'Tubeguruji.Com Exclusive App Access', included: true },
      { text: 'Email Support', included: true },
    ],
    button: 'Get Started',
  },
];

export default function UpgradePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12">
      <h1 className="text-4xl font-bold mb-2">Upgrade</h1>
      <p className="text-gray-500 mb-10 text-center">Upgrade to monthly plan to access unlimited mock interview</p>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col items-center min-w-[300px]"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-500 ml-1 mb-1">{plan.period}</span>
            </div>
            <ul className="mb-8 w-full">
              {plan.features.map((feature, i) => (
                <li
                  key={feature.text}
                  className={`flex items-center gap-2 mb-3 text-lg ${feature.included ? 'text-black' : 'text-gray-400'}`}
                >
                  {feature.included ? (
                    <span className="text-green-500 font-bold">&#10003;</span>
                  ) : (
                    <span className="text-red-500 font-bold">&#10007;</span>
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
            <button
              className="w-full border-2 border-primary text-primary rounded-full py-2 font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 