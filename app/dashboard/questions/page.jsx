import React from 'react';
import Link from 'next/link';

export default function QuestionsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">Practice Questions</h1>
      <p className="text-gray-500 mb-8 text-center max-w-xl">
        Explore a variety of interview questions tailored to your job role and experience. Practice answering them to boost your confidence and improve your performance.
      </p>
      <div className="w-full max-w-2xl bg-secondary rounded-2xl shadow-md p-8 flex flex-col items-center">
        <div className="mb-6 w-full flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Link href="/dashboard" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200">
              Start Mock Interview
            </button>
          </Link>
        </div>
        <div className="w-full flex flex-col gap-4">
          {/* Placeholder for questions list */}
          <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-2 items-start">
            <span className="font-semibold text-lg text-primary">Sample Question 1</span>
            <span className="text-gray-600">What is React and how does it work?</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-2 items-start">
            <span className="font-semibold text-lg text-primary">Sample Question 2</span>
            <span className="text-gray-600">Explain the concept of closures in JavaScript.</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-2 items-start">
            <span className="font-semibold text-lg text-primary">Sample Question 3</span>
            <span className="text-gray-600">How do you manage state in a React application?</span>
          </div>
          {/* Add more questions or map from data here */}
        </div>
      </div>
    </div>
  );
} 