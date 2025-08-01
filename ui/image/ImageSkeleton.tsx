"use client"

import { Suspense, useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

// import { ImageProps } from "next/image";
const loadingAnimation = "before-content-[''] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent overflow-hidden"
export interface SkeletonProps extends Omit<ImageProps, "src"> {
    promise?: Promise<string>;
    src?: string|StaticImport;
}

export default function ImageSkeleton( props : SkeletonProps){

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ servedImage, setServedImage ] = useState<string|StaticImport>("");
    try{
        useEffect(()=>{

            if(!(props.promise || props.src))
                throw new Error("For Image Skeleton you must have defined a src or promise!")
        
            if(props.promise)
            {
                props.promise.then(res => {
                    if(res!="not-found")
                        setServedImage(res);
                })
            }
            else
            {
                setServedImage(props.src!);
            }
        }, [])
      
        return (<div className={`${isLoading ? `${props.className} ${loadingAnimation} bg-gray-500 relative flex justify-center items-center before-content-['']` : ""}`}>
        { servedImage != "" && servedImage != "not-found"  &&  <Image {...props} className={`${props.className} relative ${isLoading ? "opacity-0" : ""}`} onLoadingComplete={()=>setIsLoading(false)} src={servedImage}/>}
        </div>);
    }
    catch{
        return <div className={`${props.className} ${loadingAnimation} bg-gray-500 relative flex justify-center items-center before-content-['']`}/>
    }
}
