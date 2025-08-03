"use client"

import Image from "next/image";
import { ChangeEvent, RefObject, useState } from "react";
import { ComponentProps } from "react"

type FileUploadProps = Omit<ComponentProps<"input">, "type"> & { ref?: RefObject<HTMLInputElement|null>}

export default function FileUpload({...props}: FileUploadProps){
    
    const [ usePicture, setPicture ] = useState<string>("");
    
    const onPictureChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setPicture(URL.createObjectURL(e.target.files[0]));
        }
    }

    return <div className={props.className}>
        {usePicture && <Image width={1600} height={900} alt="File Upload" src={usePicture} className="w-60 rounded-2xl"/>}
        
        <input name="upload" ref={props.ref} type="file" {...props} className="pt-3 pl-1 text-white file:transition-all file:p-2 file:bg-slate-600 file:rounded-lg file:hover:scale-105 file:mr-4 file:cursor-pointer" onChange={onPictureChange}/>
    </div>
}