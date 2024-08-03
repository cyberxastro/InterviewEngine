"use client"
import React, { useEffect, useState } from "react";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../../../utils/db";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../../../../components/ui/collapsible"
import { ChevronsDown, ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([])
    const router = useRouter();
    useEffect(() => {
        GetFeedback();
    }, [])

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id)

        // console.log(result)
        setFeedbackList(result)
    }
    return (
        <div className="p-10">

            {feedbackList?.length == 0 ?
                <h2 className="font-bold text-xl text-red-500">No interview feedback record found</h2>
                :
                <>
                    <h2 className="text-3xl font-bold text-green-500">
                        Congratulations 🎉
                    </h2>
                    <h2 className="font-bold text-2xl">Here's your interview Feedback</h2>

                    {/* <h2 className="text-primary text-lg my-3" >Your overall Interview Rating: <strong>7</strong> </h2> */}
                    <h2 className="text-sm text-grey-500" >Find below interview question with Expected demo answer, your actual answer and feedback for improvement</h2>
                    {feedbackList && feedbackList.map((items, index) => (
                        <Collapsible key={index} >
                            <CollapsibleTrigger className="w-full p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7" >
                                {items.question} <ChevronsUpDown className="h-7 w-5 text-orange-600" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-red-500 p-2 border bg-red-50 rounded-lg"><strong>Rating: </strong>{items.rating}</h2>
                                    <h2 className="text-yellow-700 p-2 border bg-yellow-50 rounded-lg"><strong>Your Answer: </strong>{items.userAns}</h2>
                                    <h2 className="text-red-700 p-2 border bg-red-50 rounded-lg"><strong>Feedback: </strong>{items.feedback}</h2>
                                    <h2 className="text-green-700 p-2 border bg-green-50 rounded-lg"><strong>Demo Answer: </strong>{items.correctAns}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                    ))}

                </>}

            <Button onClick={() => router.replace('/dashboard')} >Go Home</Button>
        </div>
    )
}

export default Feedback