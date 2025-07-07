'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown, Trophy, Star, Target, ArrowLeft, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params}) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        GetFeedback();
    }, [])

    const GetFeedback = async () => {
        try {
            const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id)
            
            console.log(result);
            setFeedbackList(result);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Calculate overall rating from individual question ratings
    const calculateOverallRating = () => {
        if (!feedbackList || feedbackList.length === 0) return 0;
        
        const totalRating = feedbackList.reduce((sum, item) => {
            const rating = parseFloat(item.rating) || 0;
            return sum + rating;
        }, 0);
        
        const averageRating = totalRating / feedbackList.length;
        return Math.round(averageRating * 10) / 10;
    }

    const getRatingColor = (rating) => {
        const numRating = parseFloat(rating);
        if (numRating >= 8) return 'text-green-600 bg-green-100';
        if (numRating >= 6) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    }

    const getRatingIcon = (rating) => {
        const numRating = parseFloat(rating);
        if (numRating >= 8) return '⭐';
        if (numRating >= 6) return '⭐';
        return '⭐';
    }

    const overallRating = calculateOverallRating();
    const getOverallRatingColor = () => {
        if (overallRating >= 8) return 'text-green-600';
        if (overallRating >= 6) return 'text-yellow-600';
        return 'text-red-600';
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your feedback...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto p-6 lg:p-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 shadow-lg">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Congratulations!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Here is your interview feedback
                    </p>
                </div>

                {feedbackList?.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Target className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">No feedback available</h2>
                        <p className="text-gray-500">Your interview feedback will appear here once available.</p>
                    </div>
                ) : (
                    <>
                        {/* Overall Rating Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">Overall Performance</h2>
                                        <p className="text-sm text-gray-500">Based on all questions</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-3xl font-bold ${getOverallRatingColor()}`}>
                                        {overallRating}/10
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(10)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-4 h-4 ${i < Math.floor(overallRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${(overallRating / 10) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Feedback Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Target className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">Review Your Performance</h3>
                                    <p className="text-blue-700 text-sm">
                                        Find below each interview question with correct answers, your responses, and personalized feedback for improvement.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Questions Feedback */}
                        <div className="space-y-6">
                            {feedbackList && feedbackList.map((item, index) => (
                                <Collapsible key={index} className="group">
                                    <CollapsibleTrigger className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 text-left flex justify-between items-center group-data-[state=open]:shadow-lg group-data-[state=open]:border-blue-200">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 line-clamp-2">{item.question}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(item.rating)}`}>
                                                        {getRatingIcon(item.rating)} {item.rating}/10
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronsUpDown className="w-5 h-5 text-gray-400 group-data-[state=open]:rotate-180 transition-transform duration-200" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2">
                                        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                                            {/* Rating */}
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                <div className="p-2 bg-gray-200 rounded-lg">
                                                    <Star className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">Your Rating</p>
                                                    <p className={`text-lg font-bold ${getRatingColor(item.rating)}`}>
                                                        {item.rating}/10
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Your Answer */}
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    Your Answer
                                                </h4>
                                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                                    <p className="text-gray-800 text-sm leading-relaxed">{item.userAnswer}</p>
                                                </div>
                                            </div>

                                            {/* Correct Answer */}
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    Correct Answer
                                                </h4>
                                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                                    <p className="text-gray-800 text-sm leading-relaxed">{item.correctAns}</p>
                                                </div>
                                            </div>

                                            {/* Feedback */}
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    Feedback for Improvement
                                                </h4>
                                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                    <p className="text-gray-800 text-sm leading-relaxed">{item.feedback}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </div>
                    </>
                )}

                {/* Action Button */}
                <div className="mt-12 text-center">
                    <Button 
                        onClick={() => router.replace('/dashboard')}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Feedback