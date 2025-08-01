"use client"

import serveFile from "@/lib/database";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogPostProps {
    id: string;
}

export default function BlogPost({ id }: BlogPostProps){
    
    const [url, setUrl] = useState<string>("");

    useEffect(()=>{
        const fetchData = async () => {
            const url = await serveFile("blog", `${id}.md`);

            const text = await (await fetch(url)).text()
            setUrl(text)
        }
        fetchData();
    }, [id])

    return <ReactMarkdown components={{
        code({ node, className, children, ...props}: any){
            return <SyntaxHighlighter style={dracula} language="python">
                {String(children).replace("/\n$/", "")}
            </SyntaxHighlighter>
        }
    }}>{url}</ReactMarkdown>
}