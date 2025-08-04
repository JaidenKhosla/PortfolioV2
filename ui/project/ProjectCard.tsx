"use client"
// import Image from "next/image";
// import { redirect } from "next/navigation";

import ImageSkeleton from "@/ui/image/ImageSkeleton";
import Link from "next/link";
import serveImage from "@/lib/database";

import Tag from "@/ui/tags";
import { useEffect, useState } from "react";


interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    tags: string[];
}

export default function ProjectCard({
    title, description, link, tags
} : ProjectCardProps) {

    const [ usePromise, setPromise ] = useState<Promise<string>>();

    useEffect(()=>{
        setPromise(serveImage("portfolio-images", `${title.replaceAll(" ", "-")}.jpg`))
    }, [])


    return <>{(usePromise) && <Link className="w-200 md:w-100 select-none transition hover:scale-103 cursor-pointer group h-max" href={link} target="_blank">
        <ImageSkeleton width={1600} height={900} alt={`An Image of ${title}`} draggable={false} className="w-full h-50 md:h-30 rounded-t-4xl object-cover transition group-hover:grayscale-90" promise={usePromise}/>
        <div className="text-white bg-gray-700/60 pl-6 pt-3 pb-4 rounded-b-4xl h-[20rem] md:h-[16rem] flex flex-col items-center md:items-start">
            <p className="font-bold text-6xl md:text-4xl py-1.5">{title}</p>
            <div className="flex flex-wrap gap-1 py-2">{tags.map((tag)=><Tag title={tag} key={tag}/>)}</div>
            <p className="font-light pt-6 md:pt-2 md:px-0 md:text-base text-3xl px-5">{description}</p>
        </div>
    </Link>}</>
}

