"use client"

import Link from "next/link";
import { IconType } from "react-icons";
import { BsInstagram, BsLinkedin } from "react-icons/bs";

import sendToMe, { returnSchema } from "@/lib/MailService";
import { useFormState } from "react-dom";
import { useActionState } from "react";

interface link {
    link: string;
    icon: IconType;
}

const formLinks: {[key: string]: link} = {
    "Instagram" : {link: "https://www.instagram.com/jaidenkhosla/", icon: BsInstagram},
    "Linkedin" : {link: "https://www.linkedin.com/in/jaiden-khosla-047851283/", icon: BsLinkedin}
}

const inputStyle = "w-full py-3 pl-3 rounded-xl border-white border-[0.1rem] focus:border-[0.1rem] focus:text-lg transition-all h-12"

const initialState: returnSchema = {
    errors : {},
    msg: null,
}

export default function ContactForm(){

    const [ state, action ] = useActionState(sendToMe, initialState);

    return (
    <div className="text-white bg-cyan-950/30 w-fit p-8 rounded-4xl self-center justify-self-center">
        <h1 className="font-bold text-[2rem] flex-wrap">Contact Form</h1>
        <form className="w-fit flex flex-col gap-y-3" action={action}>
        <p className="text-wrap font-light text-xl w-100 py-3.5">Please feel free to reach out out! I will try to reply back as soon as possible!</p>
        <div className="border-white border-[0.1rem] w-full"></div>
            <div className="flex gap-x-4">
                { Object.keys(formLinks).map(name=>{
                    const formLink = formLinks[name];
                    return <Link key={name} href={formLink.link} target="_blank" className="text-lg font-bold bg-slate-700 p-3 px-12 rounded-2xl flex items-center gap-x-3 transition hover:scale-105 hover:bg-current/30"><formLink.icon/> <p>{name}</p></Link>
                })
                }
            </div>
            
            <input className={inputStyle} type="text" placeholder="Your Name" name="name" aria-errormessage="nameError"/>
            <div id="nameError">
                {state.errors?.name && state.errors.name.map(err => <p className="text-red-500 text-sm" key={err}>{err}</p>)}
            </div>
            <input className={inputStyle} type="text" placeholder="Your Email" name="email" aria-errormessage="emailError"/>
            <div id="emailError">
                {state.errors?.email && state.errors.email.map(err => <p className="text-red-500 text-sm" key={err}>{err}</p>)}
            </div>
            <textarea className={`${inputStyle} h-48`} placeholder="Your Message" name="message" aria-errormessage="messageError"></textarea>
            <div id="messageError">
                {state.errors?.message && state.errors.message.map(err => <p className="text-red-500 text-sm" key={err}>{err}</p>)}
            </div>
            <button className="w-full p-3 border-[0.1rem] text-white rounded-xl transition-all hover:text-lg hover:font-semibold h-min cursor-pointer" aria-errormessage="message">Send Message</button>
            <div className="message">
                { state.msg && <p className={`text-sm ${state.errors ? "text-red-500" : "text-green-500"}`}>{state.msg}</p>}
            </div>
        </form>
    </div>
    );
}