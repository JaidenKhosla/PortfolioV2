"use client"

import Link from "next/link";
import { title } from "process";
import { IconType } from "react-icons";

interface MiniLinkProps {
    title: string;
    link: string;
    icon: IconType;
}

export default function MiniLink({ title, link, icon: Icon} : MiniLinkProps){
    return <Link href={link} target="_blank" className="flex gap-0.5 text-white hover:text-gray-300 transition-all duration-75 hover:translate-1 text-[100%] items-center"><Icon size={"2rem"}/>{title}</Link>
}