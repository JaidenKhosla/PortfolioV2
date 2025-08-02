"use client"

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchBlogWrapper, BlogInfo } from "@/lib/database";

import { IoIosCopy, IoMdCheckmark } from "react-icons/io";
import LoadingPage from "@/app/loading";
//Import Nunito bc ReactMarkdown changes the font
import { workSans } from "@/ui/fonts";
import Tag from "@/ui/tags";

import { notFound } from "next/navigation";

interface BlogPostProps {
    id: string;
}

export default function BlogPost({ id }: BlogPostProps){
    
    const [url, setUrl] = useState<string>("");
    const [ blogPostInfo, setBlogPostInfo ] = useState<BlogInfo|null>(null);

    useEffect(()=>{
        const fetchData = async () => {
            const [ text, info ] = await fetchBlogWrapper(id);
            setUrl(text as string);
            setBlogPostInfo(info as BlogInfo);
        };

        fetchData();

    }, [id])

    if(blogPostInfo?.id == -1) notFound();

    return <main className="text-2xl flex flex-col justify-center items-center">
       {url && blogPostInfo && <><div className="flex flex-col items-center">
            <h1 className="font-extrabold text-6xl">{blogPostInfo?.title || ""}</h1>
            <p className="font-semibold text-2xl">Written by {blogPostInfo?.author || ""}</p>
            <p className="font-light text-2xl">{new Date(blogPostInfo?.created_at || -1).toLocaleString()}</p>
            <div className="flex gap-x-3.5 my-3">
                {blogPostInfo.tags.map(tag => <Tag title={tag} key={tag}/>)}
            </div>
        </div>
        <div>

            <ReactMarkdown components={{
                code({ node, className, children, ...props}: any){
                    const [tags, ...text] = String(children).split("\n");
                    const [ language, fileName ] = tags.split(" ")
                    const [ isCopying, setIsCopying ] = useState(false);
                    
                    const iconProps = {
                        size:"1.5rem",
                        className: `mr-3 cursor-pointer hover:text-gray-300 transition ${isCopying ? "text-green-500 hover:text-green-800" : ""}`,
                         onClick: ()=>{navigator.clipboard.writeText(text.join("\n")); setIsCopying(true); setTimeout(()=>setIsCopying(false), 3000)}
                    }

                    return <div className="w-[64rem] py-5">
                        <div className={`bg-slate-700 p-2 font-light text-xl ${workSans.className} rounded-t-lg flex items-center justify-between`}>
                            <p>{fileName}</p>
                            { isCopying ? <IoMdCheckmark {...iconProps}/> : <IoIosCopy {...iconProps}/>}
                        </div>
                        <SyntaxHighlighter style={dracula} className="m-0! rounded-t-none!" language={language} showInlineLineNumbers={true} >
                        {text.join("\n")}
                    </SyntaxHighlighter>
                </div>
                },
                h1({node, className, children, ...props}: any){
                    return <h1 className="font-extrabold text-5xl pb-5 ">{children}</h1>
                },

                p({node, className, children, ...props}: any){
                    return <p className="font-light">{children}</p>
                }

            }}>{url}</ReactMarkdown>
        </div></> || <LoadingPage/>}
    </main>
}