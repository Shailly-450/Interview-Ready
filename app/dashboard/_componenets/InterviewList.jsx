'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { InterviewReady } from '@/utils/schema'
import { eq, desc ,orderBy} from 'drizzle-orm'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {

    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);
    useEffect(() => {
        user && GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        const result = await db.select()
        .from(InterviewReady)
        .where(eq(InterviewReady.createdBy,user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(InterviewReady.id));
        
        console.log(result);
        setInterviewList(result);
    }

    
  return (
    <div>
        <h2 className='text-xl font-bold'>Previous Mock Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {interviewList && interviewList.map((interview, index) => (
            <InterviewItemCard
             key={index} 
             interview={interview} />
        ))}
            
        
        </div>
        
    </div>
  )
}

export default InterviewList