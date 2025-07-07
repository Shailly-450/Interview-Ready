'use client';
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { InterviewReady } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon, Video, Mic, Play, Clock, Briefcase, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuestionsSection from './start/_components/QuestionsSection';



function Interview() {
    const [interviewDetails,setInterviewDetails]=useState([]);
    const [webCamEnabled,setWebCamEnabled]=useState(false);
    const params=useParams();
    useEffect(()=>{
        
        console.log(params.interviewId);
        getInterviewDetails();
    },[]);

    const getInterviewDetails=async()=>{
        const result=await db.select().from(InterviewReady)
        .where(eq(InterviewReady.mockId,params.interviewId));
        setInterviewDetails(result[0]);
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
        <div className='w-full px-4'>
            {/* Header */}
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
                    Interview Session
                </h1>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                    Get ready to showcase your skills and experience. Make sure your webcam and microphone are working properly.
                </p>
            </div>
            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full'>
                {/* Left side - Interview Details */}
                <div className='flex flex-col justify-center items-center lg:items-start w-full h-full'>
                    <div className='bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 w-full h-full transform hover:scale-105 transition-all duration-300'>
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='p-2 bg-blue-100 rounded-lg'>
                                <Briefcase className='w-6 h-6 text-blue-600' />
                            </div>
                            <h3 className='text-2xl font-bold text-gray-800'>Interview Details</h3>
                        </div>
                        
                        <div className='space-y-6'>
                            <div className='bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <User className='w-4 h-4 text-blue-600' />
                                    <span className='font-semibold text-blue-800'>Job Position</span>
                                </div>
                                <p className='text-gray-800 font-medium'>{interviewDetails?.jobPostion || 'Loading...'}</p>
                            </div>
                            
                            <div className='bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <FileText className='w-4 h-4 text-purple-600' />
                                    <span className='font-semibold text-purple-800'>Job Description</span>
                                </div>
                                <p className='text-gray-800'>{interviewDetails?.jobDesc || 'Loading...'}</p>
                            </div>
                            
                            <div className='bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-100'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <Clock className='w-4 h-4 text-green-600' />
                                    <span className='font-semibold text-green-800'>Experience Required</span>
                                </div>
                                <p className='text-gray-800'>{interviewDetails?.jobExperience || 'Loading...'}</p>
                            </div>
                        </div>
                        
                        <div className='mt-8 p-6 border-2 border-yellow-200 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 shadow-sm'> 
                            <div className='flex items-center gap-3 mb-3'>
                                <div className='p-2 bg-yellow-100 rounded-lg'>
                                    <Lightbulb className='w-5 h-5 text-yellow-600' />
                                </div>
                                <h4 className='font-bold text-yellow-800 text-lg'>Important Information</h4>
                            </div>
                            <p className='text-yellow-700 leading-relaxed'>{process.env.NEXT_PUBLIC_INFORMATION || 'Please ensure you have a stable internet connection and a quiet environment for the interview.'}</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Webcam */}
                <div className='flex flex-col gap-6 w-full h-full'>
                    <div className='bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100 w-full h-full'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='p-2 bg-red-100 rounded-lg'>
                                <Video className='w-6 h-6 text-red-600' />
                            </div>
                            <h3 className='text-xl font-bold text-gray-800'>Camera & Audio</h3>
                        </div>
                        
                        {webCamEnabled ? (
                            <div className='relative w-full'>
                                <Webcam
                                    onUserMedia={()=>setWebCamEnabled(true)}
                                    onUserMediaError={()=>setWebCamEnabled(false)}
                                    mirrored={true}
                                    style={{
                                        width: '100%',
                                        height: 450,
                                        borderRadius: '16px',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                                <div className='absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-full'>
                                    <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                                    Live
                                </div>
                            </div>
                        ) : (
                            <div className='w-full h-[450px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300'>
                                <div className='p-6 bg-white rounded-full shadow-lg mb-4'>
                                    <WebcamIcon className='w-16 h-16 text-gray-400' />
                                </div>
                                <p className='text-gray-600 text-lg font-medium mb-2'>Camera Not Active</p>
                                <p className='text-gray-500 text-sm text-center max-w-xs'>
                                    Click the button below to enable your camera and microphone
                                </p>
                            </div>
                        )}
                        
                        <div className='mt-6 space-y-4'>
                            <Button 
                                onClick={()=>setWebCamEnabled(true)} 
                                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'
                                disabled={webCamEnabled}
                            >
                                <div className='flex items-center gap-2'>
                                    {webCamEnabled ? (
                                        <>
                                            <Video className='w-5 h-5' />
                                            Camera Active
                                        </>
                                    ) : (
                                        <>
                                            <Mic className='w-5 h-5' />
                                            Enable Camera & Microphone
                                        </>
                                    )}
                                </div>
                            </Button>
                            
                            <div className='flex justify-end'>
                                    <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                                    <Button className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'>
                                    <div className='flex items-center gap-2'>
                                        <Play className='w-5 h-5' />
                                        Start Interview
                                    </div>
                                </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Interview