// "use client"
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { TEMPLATE } from "../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export interface HISTORY{
    forEach(arg0: (element: any) => void): unknown;
    id:number,
    formData:string,
    aiResponse:string,
    templateSlug:string,
    createdBy:string,
    createdAt:string
}

async function History(){
    const user = await currentUser();
    const HistoryList:HISTORY[]=await db.select().from (AIOutput)
    .where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(AIOutput.id))

    const GetTemplateName=(slug:string)=>{
        const template:TEMPLATE|any=Templates.find((item)=>item.slug==slug)
        return template;
    }

  return (
    <div className="m-5 p-5 border rounded-lg bg-secondary">
      <h2 className="font-bold text-3xl">History</h2>
      <h2 className="text-gray-500" >Search Your Previously generate AI content</h2>
      <div className="grid grid-cols-6 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2" >AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
      </div>
      {HistoryList.map((item:HISTORY,index:number)=>
        <>
        <div className="grid grid-cols-6 my-5 py-3 px-3">
        <h2 className="col-span-2 flex gap-2 items-center">
          <Image src={GetTemplateName(item?.templateSlug)?.icon} width={25} height={25}alt="image"/>
          {GetTemplateName(item.templateSlug)?.name}
        </h2>
        <h2 className="col-span-2 line-clamp-3">{item?.aiResponse}</h2>
        <h2>{item.createdAt}</h2>
        <h2>{item?.aiResponse.length}</h2>
        </div>
        </>
      
      )}

    </div>
  );
};

export default History