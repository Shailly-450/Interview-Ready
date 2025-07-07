'use client'
import Webcam from 'react-webcam'
import Image from 'next/image'
import React, { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, MicOff, Square, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModal'
import moment from 'moment'
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviwData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [webcamError, setWebcamError] = useState(false)
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle'); // 'idle', 'recording', 'processing', 'success'
  
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>{
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    })
  },[results])

  useEffect(()=>{
    if(isRecording&&userAnswer.length>10){
      UpdateUserAnswerInDb();
    }
  },[userAnswer])

  useEffect(() => {
    if (isRecording) {
      setRecordingStatus('recording');
    } else if (loading || isProcessing) {
      setRecordingStatus('processing');
    } else if (recordingStatus === 'processing') {
      setRecordingStatus('success');
      setTimeout(() => setRecordingStatus('idle'), 2000);
    }
  }, [isRecording, loading, isProcessing]);

  const StartStopRecording=async()=>{
    if (loading || isProcessing) return; // Prevent multiple clicks
    
    setLoading(true);
    setIsProcessing(true);
    
    if(isRecording){
      stopSpeechToText();
      if(userAnswer.length<10){
        setLoading(false);
        setIsProcessing(false);
        toast.error('Answer too short. Please provide a more detailed response.');
        return;
      }
      
      const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+"\n\n"+"Answer:"+userAnswer+",Depend on the answer, give me give me a rating out of 5 and feedback on the answer in just 3 to 5 lines to improve it in JSON format with rating and feedback";

      try {
        const result=await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','').replace('**','');
        console.log(mockJsonResp);
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
        const resp=await db.insert(UserAnswer).values({
          mockIdRef:interviwData?.mockId,
          question:mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAnswer:userAnswer,
          rating:JsonFeedbackResp?.rating,
          feedback:JsonFeedbackResp?.feedback,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-YYYY HH:mm:ss'),
        })
        console.log(resp);
        if(resp){
          toast.success('Answer saved successfully!');
          setResults([]);
          setUserAnswer('');
        } else {
          toast.error('Error while saving your answer. Please try again.');
        }
      } catch (error) {
        console.error('Error saving answer:', error);
        toast.error('An error occurred while processing your answer.');
      } finally {
        setLoading(false);
        setIsProcessing(false);
      }
    } else {
      startSpeechToText();
      setLoading(false);
      setIsProcessing(false);
    }
  }

  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user"
  }

  const handleUserMedia = useCallback(() => {
    console.log('Webcam started')
    setWebcamError(false)
  }, [])

  const handleUserMediaError = useCallback(() => {
    console.log('Webcam error')
    setWebcamError(true)
  }, [])

  const UpdateUserAnswerInDb=async()=>{
    const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+"\n\n"+"Answer:"+userAnswer+",Depend on the answer, give me give me a rating out of 5 and feedback on the answer in just 3 to 5 lines to improve it in JSON format with rating and feedback";

    try {
      const result=await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','').replace('**','');
      console.log(mockJsonResp);
      const JsonFeedbackResp=JSON.parse(mockJsonResp);
      const resp=await db.update(UserAnswer).set({
        userAnswer:userAnswer,
        rating:JsonFeedbackResp?.rating,
        feedback:JsonFeedbackResp?.feedback,
      }).where(eq(UserAnswer.id,userAnswer.id));
      console.log(resp);
      if(resp){
        toast.success('Answer updated successfully');
        setUserAnswer('');
        setIsRecording(false);
        setLoading(false);
      } else {
        toast.error('Error while updating your answer. Please try again.');
        setUserAnswer('');
        setIsRecording(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating answer:', error);
      toast.error('An error occurred while updating your answer.');
    }
  }

  const getButtonContent = () => {
    switch (recordingStatus) {
      case 'recording':
        return (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <Square className="w-4 h-4" />
              <span>Stop Recording</span>
            </div>
          </>
        );
      case 'processing':
        return (
          <>
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </div>
          </>
        );
      case 'success':
        return (
          <>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Answer Saved!</span>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              <span>Start Recording</span>
            </div>
          </>
        );
    }
  };

  const getButtonStyles = () => {
    const baseStyles = "relative px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    
    switch (recordingStatus) {
      case 'recording':
        return `${baseStyles} bg-red-500 hover:bg-red-600 text-white focus:ring-red-300 shadow-lg hover:shadow-xl`;
      case 'processing':
        return `${baseStyles} bg-gray-500 text-white cursor-not-allowed shadow-md`;
      case 'success':
        return `${baseStyles} bg-green-500 text-white shadow-lg`;
      default:
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-blue-300 shadow-lg hover:shadow-xl`;
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-6'>
      {/* Webcam Section */}
      <div className="w-full mb-6">
        {webcamError ? (
          <div className='flex items-center justify-center bg-gray-100 rounded-xl p-8'>
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <Image 
                src='/webcam.png' 
                alt='webcam placeholder' 
                width={400} 
                height={300}
                className='rounded-lg mx-auto'
              />
              <p className="text-sm text-gray-500 mt-2">Camera not available</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <Webcam
              audio={false}
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              mirrored={true}
              className="w-full h-[300px] rounded-xl shadow-lg"
            />
            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recording Status */}
      {isRecording && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <Mic className="w-4 h-4" />
            <span className="text-sm font-medium">Recording in progress...</span>
          </div>
          {userAnswer && (
            <p className="text-xs text-red-600 mt-1">
              Answer length: {userAnswer.length} characters
            </p>
          )}
        </div>
      )}

      {/* Record Button */}
      <div className="w-full flex justify-center">
        <button
          className={getButtonStyles()}
          onClick={StartStopRecording}
          disabled={loading || isProcessing}
        >
          {getButtonContent()}
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          {isRecording 
            ? "Click the button above to stop recording and save your answer"
            : "Click the button above to start recording your answer"
          }
        </p>
        {!isRecording && (
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Mic className="w-3 h-3" />
              <span>Voice recording</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>AI feedback</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecordAnswerSection