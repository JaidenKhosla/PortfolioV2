"use client"

import { IconType } from "react-icons";
import Link from "next/link";

interface ButtonProps {
    title: string;
    path: string;
    icon?: IconType;

    onClick?: ()=>void
}

export default function Button({title, path, icon: Icon, onClick}: ButtonProps){
    return <Link className="px-5 py-2 hover:scale-130 md:hover:scale-100 md:hover:pl-8 text-white font-semibold text-8xl md:text-xl transition-all cursor-pointer flex items-center gap-x-3 select-none" href={path} prefetch={true} onClick={onClick}>
        {Icon && <Icon className="text-white text-8xl md:text-2xl"/>}{title}
    </Link>
}