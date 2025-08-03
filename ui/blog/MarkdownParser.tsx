"use-client"

import ReactMarkdown from "react-markdown";
import { useState, Children } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoIosCopy, IoMdCheckmark } from "react-icons/io";
import LoadingPage from "@/app/loading";
//Import Nunito bc ReactMarkdown changes the font
import { workSans } from "@/ui/fonts";
import Image from "next/image";
import ImageSkeleton from "../image/ImageSkeleton";
import serveFile from "../../lib/database";

interface MarkdownParserProps {
    children?: string;
    uuid?: string
}

export default function MarkdownParser({ children, uuid }: MarkdownParserProps){
    return ( 
        <div className="flex flex-col items-start pb-12">
            <ReactMarkdown 
            components={{
                    code({ node, className, children, ...props}: any){
                        const [tags, ...text] = String(children).split("\n");
                        const [ language, fileName ] = tags.split(" ")
                        const [ isCopying, setIsCopying ] = useState(false);
                        
                        const iconProps = {
                            size:"1.5rem",
                            className: `mr-3 cursor-pointer hover:text-gray-300 transition ${isCopying ? "text-green-500 hover:text-green-800" : ""}`,
                            onClick: ()=>{navigator.clipboard.writeText(text.join("\n")); setIsCopying(true); setTimeout(()=>setIsCopying(false), 3000)}
                        }

                        return <div className="w-[48rem] py-5">
                            <div className={`bg-slate-700 p-2 font-light text-xl ${workSans.className} rounded-t-lg flex items-center justify-between`}>
                                <p>{fileName}</p>
                                { isCopying ? <IoMdCheckmark {...iconProps}/> : <IoIosCopy {...iconProps}/>}
                            </div>
                            <SyntaxHighlighter style={dracula} className="m-0! rounded-t-none!" language={language} showInlineLineNumbers={true} >
                            {text.join("\n")}
                        </SyntaxHighlighter>
                    </div>
                    },
                    h1({children, ...props}: any){
                        return <h1 className="font-extrabold text-5xl pb-5 ">{children}</h1>
                    },

                    h2({children, ...props}: any){
                        return <h2 className="font-bold text-4xl">{children}</h2>
                    },

                    h3({children, ...props}: any){
                        return <h2 className="font-semibold text-3xl">{children}</h2>
                    },
                    
                    p({children, ...props}: any){
                        if(Children.toArray(children).filter(e=>e instanceof HTMLDivElement))
                            return children;
                        return <p className="font-medium text-lg">{children}</p>
                    },

                    a({children, ...props}: any){
                        return <a className="font-medium text-lg text-blue-500 hover:text-blue-200 transition-all cursor-pointer">{children}</a>
                    },

                    ul({children, ...props}: any){
                        return <ul className="font-medium text-lg list-disc pl-4">{children}</ul>
                    },
                    
                    img({children, ...props}: any){
                        return <ImageSkeleton width={1600} height={900} alt={`${props.src}`} promise={serveFile("blog-images", `${uuid ? `${props.src}-${uuid}` : `${props.src}`}`)} className="w-64 rounded-2xl"/>
                    }

                }}>{children}</ReactMarkdown>
            </div>)
}