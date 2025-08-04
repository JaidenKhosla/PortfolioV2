"use client"

import Button from "@/ui/navbar/Button";
import Image from "next/image";
import { FaHome, FaPhoneAlt } from 'react-icons/fa';
import { FaNewspaper } from 'react-icons/fa6';
import { RiComputerFill } from 'react-icons/ri';
import { BsNewspaper } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

import { useState } from "react";

export default function Navbar(){

    const [ useVisible, setVisible ] = useState(false);

    const closeFunc = () => {
        setVisible(false);
    }

    return (
    <nav className="w-screen h-32 md:h-screen md:w-56 justify-center md:justify-start items-start z-10 bg-slate-950/90 shadow-md shadow-gray-900 p-0 md:pt-15 flex flex-col sticky top-0">
        <div className="flex justify-between md:justify-center items-center px-12 md:px-0 w-full">
            <Image src="/images/Computer.png" width={90} height={90} alt="Computer in Navbar! What's this doing here?" draggable={false} className="self-center mt-5 md:my-0 pb-5 w-20 select-none" priority={true}/>
            <BiMenu 
            className=" text-white block cursor-pointer md:hidden transition-all hover:text-gray-300" 
            size={"8rem"}
            onClick={()=>setVisible(e=>!e)} 
            />
        </div>
        <div className={`${useVisible ? "opacity-100 visible": "opacity-0 invisible"}  transition-all flex flex-col justify-start pt-32 md:pt-0 items-center absolute -z-10 top-32 md:top-0 w-screen h-screen bg-slate-800/75  md:bg-transparent md:h-fit md:w-fit md:relative md:block md:opacity-100 md:visible gap-y-30`}>
            <Button title="Home" path="/" icon={FaHome} onClick={closeFunc}/>
            <Button title="About" path="/about" icon={FaNewspaper} onClick={closeFunc}/>
            <Button title="Projects" path="/projects" icon={RiComputerFill} onClick={closeFunc}/>
            <Button title="Blog" path="/blog" icon={BsNewspaper} onClick={closeFunc}/>
            <Button title="Contact" path="/contact" icon={FaPhoneAlt} onClick={closeFunc}/>
        </div>
    </nav>
 );
}