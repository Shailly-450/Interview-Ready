'use client';
import React, { useState } from "react";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { chatSession } from "@/utils/GeminiAiModal";
import { InterviewReady } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const [error, setError] = useState('');
    const router=useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        setError('');
        e.preventDefault();

        const InputPrompt = `Job position: ${jobPosition}, Job description: ${jobDesc}, Years of experience: ${jobExperience}. Respond ONLY with a JSON array of objects, each with "question" and "answer" fields. Do NOT include any extra text, markdown, or explanation. Example: [ { "question": "What is React?", "answer": "React is a JavaScript library for building user interfaces." } ] Return only valid JSON.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            let textResponse = await result.response.text();
            textResponse = textResponse.replace(/```json\n?/g, '').replace(/\n```/g, '');

            let parsedJson;
            try {
                parsedJson = JSON.parse(textResponse);
                setJsonResponse(parsedJson);
                setError('');
                console.group("%cValid JSON from AI", "color: green; font-weight: bold;");
                console.info("Parsed AI response as JSON:");
                if (Array.isArray(parsedJson)) {
                    console.table(parsedJson);
                } else {
                    console.dir(parsedJson, { depth: null });
                }
                console.groupEnd();
            } catch (err) {
                setJsonResponse([]);
                setError('Sorry, we could not generate interview questions. Please try again or rephrase your input.');
                console.group("%cInvalid JSON from AI", "color: red; font-weight: bold;");
                console.error("The AI response could not be parsed as JSON.");
                console.info("Raw AI response below:");
                console.log(textResponse);
                console.groupEnd();
                setLoading(false);
                return;
            }

            // Insert into DB if JSON is valid
            if (parsedJson) {
                const resp = await db.insert(InterviewReady)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: textResponse,
                        jobPostion: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                    })
                    .returning({
                        mockId: InterviewReady.mockId,
                    });
                console.log("Inserted ID:", resp)
                if(resp){
                    setOpenDialog(false);
                    setJobPosition('');
                    setJobDesc('');
                    setJobExperience('');
                    setJsonResponse([]);
                    router.push(`/dashboard/interview/${resp[0]?.mockId}`);
                }

            } else {
                console.log("Error: No valid JSON to insert.");
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error("Error in onSubmit:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us about your job interview</DialogTitle>
                        <DialogDescription>
                            {error && (
                                <div className="text-red-600 bg-red-100 border border-red-300 rounded p-2 my-2">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details about your job position</h2>
                                    <div className="mt-7 my-3">
                                        <Label>Job Role/Position</Label>
                                        <Input
                                            placeholder="Ex: Software Engineer"
                                            required
                                            value={jobPosition}
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-7 my-3">
                                        <Label>Job Description</Label>
                                        <Textarea
                                            placeholder="Ex: We are looking for a Software Engineer with 3 years of experience in React and Node.js"
                                            required
                                            value={jobDesc}
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-7 my-3">
                                        <Label>Years of Experience</Label>
                                        <Input
                                            placeholder="Ex: 5"
                                            type="number"
                                            max="50"
                                            required
                                            value={jobExperience}
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" /> Generating...
                                            </>
                                        ) : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;