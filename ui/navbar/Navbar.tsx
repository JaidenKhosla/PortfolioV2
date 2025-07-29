"use client"

import Button from "@/ui/navbar/Button";
import Image from "next/image";
import { FaHome, FaPhoneAlt } from 'react-icons/fa';
import { FaNewspaper } from 'react-icons/fa6';
import { RiComputerFill } from 'react-icons/ri';

export default function Navbar(){
    return (
    <div className="h-screen w-80 md:w-48 bg-slate-950/90 shadow-md shadow-gray-900 pt-15 flex flex-col items-start fixed">
        <Image src="/images/Computer.png" width={90} height={90} alt="Computer in Navbar! What's this doing here?" draggable={false} className="self-center pb-5 w-20 select-none"/>
        <Button title="Home" path="/" icon={FaHome}/>
        <Button title="About" path="/about" icon={FaNewspaper}/>
        <Button title="Projects" path="/projects" icon={RiComputerFill}/>
        <Button title="Contact" path="/contact" icon={FaPhoneAlt}/>
    </div>
 );
}