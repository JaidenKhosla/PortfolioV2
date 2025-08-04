"use client"


import React, { useActionState, ComponentProps, Children, ReactElement, cloneElement } from "react";

const inputStyle = "my-10 md:my-5 w-250 md:w-100 py-3 pl-3 rounded-3xl md:rounded-xl border-white border-[0.1rem] focus:border-[0.1rem] focus:text-6xl md:focus:text-lg transition-all h-32 md:h-12"
const errorStyle = "text-red-500 text-4xl md:text-sm";
const buttonStyle = "mt-10 mb-5 md:mt-5 text-6xl md:text-xl w-full p-3 border-[0.1rem] text-white rounded-xl transition-all hover:scale-105 hover:font-semibold h-32 md:h-min cursor-pointer"

const handleChild = (child: any): React.ReactNode => {
    if(React.isValidElement<React.HTMLAttributes<HTMLDivElement>>(child) && child.type==="div"){
        const children = child.props.children
        return React.cloneElement(child, { children: Children.map(children, (child => handleChild(child)))})
    }

    if(React.isValidElement<HTMLInputElement>(child) && child.type === "input"){
        return React.cloneElement(child, { className: `${inputStyle} ${child.props.className}`})
    }
    else if(React.isValidElement<HTMLButtonElement>(child) && child.type === "button"){
        return React.cloneElement(child, { className: `${buttonStyle} ${child.props.className}`})
    }
    else if(React.isValidElement<HTMLParagraphElement>(child) && child.type==='p'){
            return React.cloneElement(child, { className: `${errorStyle} ${child.props.className}`})
    }

    return child;
}


type FormProps = ComponentProps<"form"> & { children? : React.ReactNode, title?: string}

export default function Form({ children, title, ...props} : FormProps){
    return (
    <div className="text-white bg-cyan-950/20 w-300 md:w-fit h-[60rem] md:h-fit p-8 rounded-[5rem] md:rounded-4xl self-center justify-self-center flex flex-col items-center">
        {title && <h1>{title}</h1>}
        <form className={`w-fit flex flex-col gap-y-12 md:gap-y-3 items-center ${props.className}`} {...props}>
        <div className="w-full">
            {Children.map(children, (child)=>{

                return handleChild(child);
                
            })}
        </div>
        </form>

    </div>
    );
}