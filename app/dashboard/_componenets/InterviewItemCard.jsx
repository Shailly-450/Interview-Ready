import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function InterviewItemCard({interview}) {

  const router = useRouter();

  const onStart=()=>{
    router.push(`/dashboard/interview/${interview?.mockId}`);
  }

  const onFeedback=()=>{
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  }

  return (
    <div className='border rounded-lg p-3 shadow-sm'>
        <h2 className='text-lg font-bold text-primary'>{interview?.jobPostion}</h2>
        <h2 className='text-sm text-grey-600'>{interview?.jobExperience} Years of Experience</h2>
        <div className='flex justify-between items-center mt-3'>
        <h2 className='text-xs text-grey-400'>Created At: {interview?.createdAt}</h2>
           
        </div>
        <div className='flex justify-between mt-2 gap-5'>
      
          <Button size='sm' variant='outline' className='w-full'
          onClick={onFeedback}>Feedback</Button>
          
          <Button size='sm' className='w-full' onClick={onStart}>Start</Button>
          </div> 
    </div>
  )
}

export default InterviewItemCard