"use client"

import MiniLink from "@/ui/minilink/MiniLink"
import { BiLogoGithub, BiLogoInstagram, BiLogoLinkedin, BiLogoStackOverflow } from "react-icons/bi"
import { SiCodewars } from "react-icons/si";
import Fade from "@/ui/fadeIn/Fade";

export default function MiniLinkContainer(){
    return <Fade className="flex gap-x-3 gap-y-3 items-center flex-wrap w-80 my-10 justify-center md:justify-start">
        <MiniLink title="Github" link="https://github.com/JaidenKhosla" icon={BiLogoGithub}/>
        <MiniLink title="instagram" link="https://www.instagram.com/JaidenKhosla" icon={BiLogoInstagram}/>
        <MiniLink title="Linkedin" link="https://www.linkedin.com/in/jaiden-khosla-047851283/" icon={BiLogoLinkedin}/>
        <MiniLink title="Codewars" link="https://www.codewars.com/users/Jaiden%20Khosla" icon={SiCodewars}/>
        <MiniLink title="StackOverflow" link="https://stackoverflow.com/users/21538571/jaidenkhosla" icon={BiLogoStackOverflow}/>
    </Fade>
}