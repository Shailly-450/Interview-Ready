'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { InterviewReady } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle, Play, Clock, Target } from 'lucide-react';
import QuestionsSection from './_components/QuestionsSection';
import dynamic from 'next/dynamic';
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection'), { ssr: false });

function StartInterview({params}) {
    const [interviewData,setInterviewData]=useState([]);
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState([]);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        console.log('Start Interview');
        getInterviewDetails();
    },[]);

    const getInterviewDetails=async()=>{
        try {
            const result=await db.select().from(InterviewReady)
            .where(eq(InterviewReady.mockId,params.interviewId));
            const jsonMockResp=JSON.parse(result[0].jsonMockResp);
            setInterviewData(result[0]);
            setMockInterviewQuestion(jsonMockResp);
        } catch (error) {
            console.error('Error fetching interview details:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const progressPercentage = mockInterviewQuestion.length > 0 
        ? ((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100 
        : 0;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your interview...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Interview</h1>
                            <p className="text-gray-600">
                                {interviewData?.jobPostion} • {interviewData?.jobExperience} years experience
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Interview Progress</span>
                            <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    {/* Question Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                            <h2 className="text-white font-semibold flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Interview Questions
                            </h2>
                        </div>
                        <QuestionsSection
                            mockInterviewQuestion={mockInterviewQuestion}
                            activeQuestionIndex={activeQuestionIndex}
                            setActiveQuestionIndex={setActiveQuestionIndex}
                        />
                    </div>

                    {/* Recording Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4">
                            <h2 className="text-white font-semibold flex items-center gap-2">
                                <Play className="w-5 h-5" />
                                Record Your Answer
                            </h2>
                        </div>
                        <RecordAnswerSection
                            mockInterviewQuestion={mockInterviewQuestion}
                            activeQuestionIndex={activeQuestionIndex}
                            interviwData={interviewData}
                        />
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {activeQuestionIndex > 0 && (
                                <Button 
                                    variant='outline' 
                                    onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                                    className="flex items-center gap-2 px-6 py-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
                                <Button 
                                    variant='outline' 
                                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                                    className="flex items-center gap-2 px-6 py-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            )}
                            
                            {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
                                <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
                                    <Button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                        <CheckCircle className="w-4 h-4" />
                                        View Feedback
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Interview Tips */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Interview Tips
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                        <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>Speak clearly and at a moderate pace</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>Take a moment to think before answering</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p>Provide specific examples from your experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartInterview