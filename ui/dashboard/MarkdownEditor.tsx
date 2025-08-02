"use client"
import MarkdownParser from "@/ui/blog/MarkdownParser";
import { useRef, useState } from "react"

import { Fira_Code } from "next/font/google";
const FiraCodeFont = Fira_Code({subsets: ["latin"]})

const inputStyle = "pl-2 focus:border-none w-150 h-10 text-white bg-code-black border-[1px] border-white rounded-md my-3";

export default function MarkdownEditor(){

    const reference = useRef<HTMLTextAreaElement|null>(null);
    const [ useContent, setContent ] = useState<string>("");

    return (
        <div>
            <div className="flex flex-col">
                <label htmlFor="title" className="text-white text-2xl">Title</label>
                <input id="title" spellCheck={false} className={inputStyle}/>
                <label htmlFor="description" className="text-white text-2xl">Description</label>
                <input id="description" spellCheck={false} className={inputStyle}/>
                <label htmlFor="tags" className="text-white text-2xl">Tags</label>
                <input id="tags" spellCheck={false} className={inputStyle}/>
            </div>
            <h1>Editor</h1>
            <div className="flex gap-x-5">
                <textarea 
                    spellCheck={false} 
                    className={`${FiraCodeFont.className} p-3 text-lg w-[30rem] h-[50rem] bg-code-black text-white resize-none`}
                    ref={reference}
                    onKeyDown={(e)=>{
        
                        if(!reference.current) return
        
                        if(e.key === "Tab"){
                            e.preventDefault();
                            const start = reference.current?.selectionStart;
                            const end = reference.current?.selectionEnd;
                            const text = reference.current?.value;
        
                            reference.current.value = text.substring(0, start) + "\t" + text.substring(end);
        
                        }
                    }
                }
                value={useContent}
                onChange={(e)=>setContent(e.target.value)}
                />
                <div className="p-3 w-[52rem] h-[50rem] bg-gray-900/30 text-white overflow-y-scroll flex flex-col items-start">
                    <MarkdownParser>
                        {useContent}
                    </MarkdownParser>
                </div>
            </div>
        </div>
    )
}