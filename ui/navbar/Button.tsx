"use client"

import { IconType } from "react-icons";
import { redirect } from "next/navigation";


interface ButtonProps {
    title: string;
    path: string;
    icon?: IconType;
}

export default function Button({title, path, icon: Icon}: ButtonProps){
    return <div className="px-5 py-2 hover:pl-8 text-white font-semibold text-xl transition-all cursor-pointer flex items-center gap-x-3" onClick={()=>{
        redirect(path);
    }}>
        {Icon && <Icon className="text-white text-5xl" size={24}/>}{title}
    </div>
}