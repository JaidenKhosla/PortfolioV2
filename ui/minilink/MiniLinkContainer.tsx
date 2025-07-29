"use client"

import MiniLink from "@/ui/minilink/MiniLink"
import { BiLogoGithub, BiLogoInstagram, BiLogoLinkedin } from "react-icons/bi"

export default function MiniLinkContainer(){
    return <div className="flex flex-col w-30">
        <MiniLink title="Github" link="https://github.com/JaidenKhosla" icon={BiLogoGithub}/>
        <MiniLink title="instagram" link="https://www.instagram.com/JaidenKhosla" icon={BiLogoInstagram}/>
        <MiniLink title="Linkedin" link="https://www.linkedin.com/in/jaiden-khosla-047851283/" icon={BiLogoLinkedin}/>
    </div>
}