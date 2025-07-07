import { Lightbulb, Volume2, Play, CheckCircle, Clock } from 'lucide-react';
import React from 'react'
import { useEffect, useState } from 'react'

function QuestionsSection({mockInterviewQuestion,activeQuestionIndex,setActiveQuestionIndex}) {
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [isPlaying, setIsPlaying] = useState(false);

    const textToSpeech = (text)=>{
        if('speechSynthesis' in window){
            if (isPlaying) {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
                return;
            }
            
            const speech = new SpeechSynthesisUtterance(text);
            speech.onend = () => setIsPlaying(false);
            speech.onerror = () => setIsPlaying(false);
            
            window.speechSynthesis.speak(speech);
            setIsPlaying(true);
        }
        else{
            alert('Sorry, your browser does not support text to speech');
        }
    }

    useEffect(()=>{
        console.log(activeQuestionIndex);
    },[activeQuestionIndex]);

    const getQuestionStatus = (index) => {
        if (index === activeQuestionIndex) return 'active';
        if (answeredQuestions.has(index)) return 'answered';
        if (index < activeQuestionIndex) return 'completed';
        return 'pending';
    };

    const getQuestionStyles = (index) => {
        const status = getQuestionStatus(index);
        const baseStyles = "relative p-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
        
        switch (status) {
            case 'active':
                return `${baseStyles} bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg`;
            case 'answered':
                return `${baseStyles} bg-green-100 border-2 border-green-300 text-green-700 hover:bg-green-200`;
            case 'completed':
                return `${baseStyles} bg-gray-100 border-2 border-gray-300 text-gray-600 hover:bg-gray-200`;
            default:
                return `${baseStyles} bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50`;
        }
    };

    const getQuestionIcon = (index) => {
        const status = getQuestionStatus(index);
        
        switch (status) {
            case 'active':
                return <Play className="w-4 h-4" />;
            case 'answered':
                return <CheckCircle className="w-4 h-4" />;
            case 'completed':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const markQuestionAsAnswered = (index) => {
        setAnsweredQuestions(prev => new Set([...prev, index]));
    };

    return (
        <div className='p-6'>
            {/* Question Navigation */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    Question Navigation
                </h3>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                        <div
                            key={index}
                            className={getQuestionStyles(index)}
                            onClick={() => {
                                setActiveQuestionIndex(index);
                                if (answeredQuestions.has(index)) {
                                    markQuestionAsAnswered(index);
                                }
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {getQuestionIcon(index)}
                                    <span className="font-medium text-sm">
                                        Q{index + 1}
                                    </span>
                                </div>
                                {getQuestionStatus(index) === 'active' && (
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Question */}
            <div className="mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {activeQuestionIndex + 1}
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-blue-600">Current Question</h4>
                                <p className="text-xs text-blue-500">
                                    {activeQuestionIndex + 1} of {mockInterviewQuestion?.length}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                isPlaying 
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}
                            title={isPlaying ? 'Stop audio' : 'Listen to question'}
                        >
                            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                        </button>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h2 className='text-lg font-medium text-gray-800 leading-relaxed'>
                            {mockInterviewQuestion[activeQuestionIndex]?.question}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Progress Summary */}
            <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Progress Summary</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{activeQuestionIndex + 1}</div>
                        <div className="text-xs text-blue-500">Current</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{answeredQuestions.size}</div>
                        <div className="text-xs text-green-500">Answered</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{mockInterviewQuestion?.length - (activeQuestionIndex + 1)}</div>
                        <div className="text-xs text-gray-500">Remaining</div>
                    </div>
                </div>
            </div>

            {/* Note Section */}
            <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5'>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Interview Tips</h3>
                        <p className="text-sm text-blue-700 leading-relaxed">
                            {process.env.NEXT_PUBLIC_QUESTION_NOTE || 
                             "Take your time to think before answering. Provide specific examples from your experience and speak clearly."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionsSection