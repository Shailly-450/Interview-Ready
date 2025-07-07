import { UserButton } from "@clerk/nextjs";
import AddNewInterview from './_componenets/AddNewInterview'
import InterviewList from './_componenets/InterviewList'
import { Sparkles, TrendingUp, Clock, Target } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Interview Hub
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create and start your AI-powered mock interviews. Practice with personalized questions and get instant feedback to ace your next interview.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col items-center">
            <div className="p-4 bg-blue-100 rounded-lg mb-2">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-xl font-semibold text-gray-800">Total Interviews</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">Unlimited</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col items-center">
            <div className="p-4 bg-green-100 rounded-lg mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-xl font-semibold text-gray-800">AI-Powered</div>
            <div className="text-2xl font-bold text-green-600 mt-1">Smart Questions</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col items-center">
            <div className="p-4 bg-purple-100 rounded-lg mb-2">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-xl font-semibold text-gray-800">Instant</div>
            <div className="text-2xl font-bold text-purple-600 mt-1">Feedback</div>
          </div>
        </div>

        {/* Create New Interview Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Start a New Interview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AddNewInterview/>
          </div>
        </div>

        {/* Previous Interviews Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-600 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Interview History</h2>
          </div>
          <InterviewList/>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg">
              Join thousands of professionals who have improved their interview skills with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 text-lg">
                Start Your First Interview
              </button>
              <button className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}