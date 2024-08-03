import React, { useEffect, useRef } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { Button } from "@/components/ui/button";
import { CopyCheckIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"


interface props{
    aiOutput:string;
}

function OutputSection({aiOutput}:props) {
    const { toast } = useToast()
    const editorRef: any = useRef()
    const handleClick = () => {
        navigator.clipboard.writeText(aiOutput).then(() => {
          toast({
            title: "Copied",
          });
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      };
    useEffect(()=>{
        const editorInstance=editorRef.current.getInstance()
        editorInstance.setMarkdown(aiOutput);
    },[aiOutput])
    return (
        <div className="shadow-lg border rounded-lg">
            <div className="flex justify-between items-center p-5">
                <h2 className="font-medium text-lg">Your Result</h2>
                <Button className="flex gap-2"
                onClick={handleClick}
                ><CopyCheckIcon className="w-4 h-4"/>Copy</Button>
            </div>
            <Editor
                ref={editorRef}
                initialValue="Your Results will appear here !"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
            />
        </div>
    )
}

export default OutputSection