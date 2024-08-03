"use client"
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { use, useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

 function UsageTrack(){

    const {user}=useUser();
    const {totalUsage,setTotalUsage}=useContext(TotalUsageContext)
    const {updateCreditUsage,setUpdateCreditUsage}=useContext(UpdateCreditUsageContext)

    useEffect(()=>{
        user&&GetData();
    },[user])

    useEffect(()=>{
        user&&GetData()
    },[updateCreditUsage&&user])

    // const GetData=async ()=>{
    //     const result:History[]=await db.select().from(AIOutput)
    //     .where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress))

    //     GetTotalUsage(result)
    // }

    const GetData = async ()=>{
        {/* @ts-ignore */}
        const result:History[]=await db.select().from(AIOutput)
        .where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress))
        {/* @ts-ignore */}
        GetTotalUsage(result)
    }

    const GetTotalUsage=(result:HISTORY[])=>{
        let total:number=0;
        result.forEach(element=>{
            total=total+Number(element.aiResponse?.length)
        })
        setTotalUsage(total)
    }
    return(
        <div className="m-5">
            <div className="bg-secondary text-primary p-3 rounded-lg">
                <h2 className="font-medium">Credits</h2>
            <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
                <div className="h-2 bg-orange-500 rounded-full"
                style={{
                    width:(totalUsage/100000*100)+"%"
                }}
                >

                </div>
            </div>
            <h2 className="text-sm my-2">{totalUsage}/1,00,000 Credits Used</h2>
            </div>
        </div>
    )
}

export default UsageTrack