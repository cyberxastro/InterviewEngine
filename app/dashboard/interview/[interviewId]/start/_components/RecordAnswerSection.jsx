"use client"
// import { Webcam } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAIModal";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('')
    const { user } = useUser()
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        results.map((result) => {
            setUserAnswer(prevAns => prevAns + result?.transcript)
        })
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer()
        }
    }, [userAnswer])

    const StartStopRecording = async () => {
        if (isRecording) {
            // setLoading(true);
            stopSpeechToText()
            // if (userAnswer?.length < 5) {
            //     setLoading(false)
            //     toast('Error while saving the answer or might be your is too short to record, please recorde again !')
            //     return;
            // }

        }
        else {
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async () => {
        setLoading(true);
        const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.Question + ", User Answer:" + userAnswer + ", Depends on question and user answer for given interview question, Please give us rating for answer and expected correct answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field and correctAns field"

        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(mockJsonResp)
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.Question,
                // correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                correctAns: JsonFeedbackResp?.correctAns,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            })

        if (resp) {
            toast('User Answer Recorded Successfully')
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);
        setLoading(false);
    }

    return (
        <div className="flex items-center justify-center flex-col">

            <div className="flex flex-col justify-center mt-20 items-center bg-black rounded-lg p-5">
                <Image src={'/webcam.png'} width={200} height={200}
                    className="absolute" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 350,
                        width: '100%',
                        zIndex: 10,
                        borderRadius: 10
                    }}
                />
            </div>
            <Button disabled={loading} variant="outline" className="my-10" onClick={StartStopRecording} >
                {isRecording ?
                    <h2 className="text-red-500 flex gap-2" >
                        <StopCircle /> Stop Recording Answer
                    </h2>
                    : "Start Recording Answer"}
            </Button>
            {/* <Button onClick={() => console.log(userAnswer)} >Show user answer</Button> */}
        </div>
    )
}

export default RecordAnswerSection

// https://youtu.be/Q5LM985yUmQ?t=10325