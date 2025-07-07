import {pgTable, serial, text, varchar, integer} from "drizzle-orm/pg-core";

export const InterviewReady = pgTable('interviewReady', {
    id: serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPostion:varchar('jobPostion').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull(),
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockIdRef').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAnswer:text('userAnswer'),
    rating:integer('rating').notNull(),
    feedback:text('feedback').notNull(),
    userEmail:varchar('userEmail').notNull(),
    createdAt:varchar('createdAt'),
})