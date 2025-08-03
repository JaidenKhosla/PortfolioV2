"use client"
import MarkdownParser from "@/ui/blog/MarkdownParser";
import { useEffect, useRef, useState, useActionState } from "react"
import { v4 as uuidv4 } from "uuid";

import { Fira_Code } from "next/font/google";
const FiraCodeFont = Fira_Code({subsets: ["latin"]})
import { BlogInfo } from "@/lib/database";
import { uploadFile } from "@/lib/database";
const inputStyle = "pl-2 focus:border-none w-150 h-10 text-white bg-code-black border-[1px] border-white rounded-md my-3";
import type { blogCreationSchema } from "@/lib/blog";
import createBlogPost from "@/lib/blog";
import FileUpload from "@/ui/file/FileUpload";
interface MarkdownEditorProps {
    blogInfo?: BlogInfo
}

const initialState: blogCreationSchema = {
        message: null,
        errors: {}
    }

export default function MarkdownEditor({ blogInfo }: MarkdownEditorProps){

    const reference = useRef<HTMLTextAreaElement|null>(null);


    const [ useContent, setContent ] = useState<string>("");
    const [ useUUID, setUUID ] = useState<string>("");

    useEffect(()=>{
        setUUID(blogInfo?.uuid || uuidv4())
    }, []);

    const fileRef = useRef<HTMLInputElement|null>(null);
    const thumbnailReference = useRef<HTMLInputElement|null>(null);
    const [ useTitle, setTitle ] = useState<string>("");

    const [ state, action ] = useActionState(createBlogPost, initialState);
    console.log(state);
    return (
        <form action={action}>
            <div className="flex flex-col pb-3">
                <label htmlFor="title" className="text-white text-2xl">Title</label>
                <input id="title" name="title" spellCheck={false} className={inputStyle} value={useTitle} onChange={(e)=>setTitle(e.target.value)}/>
                <label htmlFor="author" className="text-white text-2xl">Author</label>
                <input id="author" name="author" spellCheck={false} className={inputStyle}/>
                <label htmlFor="description" className="text-white text-2xl">Description</label>
                <input id="description" name="description" spellCheck={false} className={inputStyle}/>
                <label htmlFor="tags" className="text-white text-2xl">Tags</label>
                <input id="tags" name="tags" spellCheck={false} className={inputStyle}/>
                <label htmlFor="file" className="text-white text-2xl">File Upload</label>
                <FileUpload ref={fileRef} id="file" name="file" className="pb-3" multiple/>
                <label htmlFor="imgCard" className="text-white text-2xl">Thumbnail Upload</label>
                <FileUpload ref={thumbnailReference} id="imgCard" name="imgCard" className="pb-3" multiple/>

                <input id="uuid" name="uuid" className="hidden" value={useUUID} readOnly/>
                <div className="flex gap-x-3">
                    <button className="p-3 bg-code-black w-32 rounded-xl hover:scale-105 transition-all text-white border-white border-[1px] cursor-pointer" onClick={
                        (e)=>{
                            e.preventDefault();
                            if(fileRef.current && fileRef.current.files){
                                for(let idx = 0; idx < fileRef.current.files.length; idx++)
                                    uploadFile(fileRef.current.files.item(idx)!, useUUID);
                            }
                            if(thumbnailReference.current && thumbnailReference.current.files){
                                const file = thumbnailReference.current.files[0];
                                const parsedFile = new File([file], useTitle, {
                                    type: file.type
                                })

                                uploadFile(parsedFile);
                            }

                    }}>Upload</button>
                    <button className="p-3 bg-code-black w-32 rounded-xl hover:scale-105 transition-all text-white border-white border-[1px] cursor-pointer">Save</button>
                </div>
            </div>
            <h1>Editor</h1>
            <div className="flex gap-x-5">
                <textarea 
                    id="content"
                    name="content"
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
                    <MarkdownParser uuid={useUUID}>
                        {useContent}
                    </MarkdownParser>
                </div>
            </div>
        </form>
    )
}