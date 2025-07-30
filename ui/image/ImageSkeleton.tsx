"use client"

import { Suspense, useState } from "react"
import Image, { ImageProps } from "next/image"

// import { ImageProps } from "next/image";
const loadingAnimation = "before-content-[''] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent overflow-hidden"
export interface SkeletonProps extends ImageProps {}

export default function ImageSkeleton( props : SkeletonProps){

    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    return <div className={`${isLoading ? `${props.className} ${loadingAnimation} bg-gray-500 relative flex justify-center items-center` : ""}`}>
        <Image {...props} className={`${props.className} relative ${isLoading ? "opacity-0" : ""}`} onLoadingComplete={()=>setIsLoading(false)}/>
    </div>
}
