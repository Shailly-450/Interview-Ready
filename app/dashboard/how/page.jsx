import React from 'react';

const steps = [
  {
    title: 'Sign Up or Log In',
    description: 'Create your free account or log in to access the dashboard and start your interview journey.',
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    ),
  },
  {
    title: 'Create a Mock Interview',
    description: 'Add your job position, description, and experience to generate a tailored mock interview with AI-powered questions.',
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
    ),
  },
  {
    title: 'Practice & Record Answers',
    description: 'Answer questions using your webcam and microphone. Practice as many times as you want and retake interviews for improvement.',
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14M4 6v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" /></svg>
    ),
  },
  {
    title: 'Get Instant Feedback',
    description: 'Receive AI-generated feedback and ratings for each answer. Review your performance and track your progress over time.',
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4h-1m4 0h-1v4h-1" /></svg>
    ),
  },
  {
    title: 'Upgrade for More',
    description: 'Unlock unlimited interviews, practice questions, exclusive app access, and premium support by upgrading your plan.',
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7" /></svg>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">How it Works</h1>
      <p className="text-gray-500 mb-10 text-center max-w-xl">Follow these simple steps to get the most out of your AI-powered interview preparation platform.</p>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center bg-secondary rounded-2xl shadow-md p-8 transition-transform hover:scale-105">
            <div className="mb-4">{step.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-center">{step.title}</h2>
            <p className="text-gray-600 text-center">{step.description}</p>
            <span className="mt-4 text-primary font-bold text-2xl">{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 