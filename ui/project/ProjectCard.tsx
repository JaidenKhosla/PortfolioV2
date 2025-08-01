
// import Image from "next/image";
// import { redirect } from "next/navigation";
import ImageSkeleton from "../image/ImageSkeleton";
import Link from "next/link";
import serveImage from "@/lib/database";

import Tag from "@/ui/tags";


interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    tags: string[];
}

export default async function ProjectCard({
    title, description, link, tags
} : ProjectCardProps) {

    const imagePromise = serveImage("portfolio-images", `${title.replaceAll(" ", "-")}.jpg`)

    return <Link className="w-100 select-none transition hover:scale-103 cursor-pointer group h-max" href={link} target="_blank">
        <ImageSkeleton width={1600} height={900} alt={`An Image of ${title}`} draggable={false} className="w-full h-30 rounded-t-4xl object-cover transition group-hover:grayscale-90" promise={imagePromise}/>
        <div className="text-white bg-gray-700/60 pl-6 pt-3 pb-4 rounded-b-4xl h-64">
            <p className="font-bold text-4xl py-1.5">{title}</p>
            <div className="flex flex-wrap gap-1 py-2">{tags.map((tag)=><Tag title={tag} key={tag}/>)}</div>
            <p className="font-light text-base">{description}</p>
        </div>
    </Link>
}

