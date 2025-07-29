"use client"

import { IconType } from "react-icons";
import { DiJavascript, DiJava, DiPython, DiCss3} from "react-icons/di";
import { SiTailwindcss, SiTypescript, SiHtml5, SiReact, SiNextdotjs, SiGodotengine, SiGithub } from "react-icons/si";
import Image from "next/image";
import { redirect } from "next/navigation";

const tagsToIcon: { [ tag: string ] : [IconType, string]} = {
    "JS" : [DiJavascript, "bg-yellow-400"],
    "Java" : [DiJava, "bg-orange-500"],
    "Python" : [DiPython, "bg-sky-600"],
    "CSS" : [DiCss3, "bg-violet-600"],
    "Tailwind" : [SiTailwindcss, "bg-cyan-300"],
    "TS" : [SiTypescript, "bg-blue-500"],
    "HTML" : [SiHtml5, "bg-red-500"],
    "React" : [SiReact, "bg-sky-400"],
    "Next" : [SiNextdotjs, "bg-neutral-950"],
    "Godot" : [SiGodotengine, "bg-cyan-700"],
    "Github" : [SiGithub, "bg-slate-800"]
}


interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
}

export default function ProjectCard({
    title, description, image, link, tags
} : ProjectCardProps) {
    return <div className="w-100 select-none transition hover:scale-103 cursor-pointer group" onClick={()=>window.open(link, "_blank")}>
        <Image width={1600} height={900} alt={`An Image of ${title}`} src={image} draggable={false} className="w-full h-30 rounded-t-4xl object-cover transition group-hover:grayscale-90"/>
        <div className="text-white bg-gray-700/60 pl-6 pt-3 pb-4 rounded-b-4xl">
            <p className="font-bold text-4xl py-1.5">{title}</p>
            <div className="flex flex-wrap gap-1 py-2">{tags.map((tag)=><Tag title={tag} key={tag}/>)}</div>
            <p className="font-light text-base">{description}</p>
        </div>
    </div>
}

export function Tag({ title }: { title: string }){
    const [ Icon, color ] = tagsToIcon[title]!
    return (
    <div className={`${color} flex gap-x-0.5 items-center p-0.5 px-1.5 w-fit rounded-lg`}>
        <Icon size={"1rem"}/>
        <p>{title}</p>
    </div>);
}