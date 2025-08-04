"use client"

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { fetchBlogWrapper, BlogInfo } from "@/lib/database";
import LoadingPage from "@/app/loading";

import Tag from "@/ui/tags";

import { notFound } from "next/navigation";
import MarkdownParser from "@/ui/blog/MarkdownParser";

interface BlogPostProps {
    id: string;
}

import Fade from "@/ui/fadeIn/Fade";

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

    return <Fade className="text-2xl flex flex-col justify-center items-center">
       {url && blogPostInfo && <><div className="flex flex-col items-center">
            <h1 className="font-extrabold text-6xl">{blogPostInfo?.title || ""}</h1>
            <p className="font-semibold text-2xl">Written by {blogPostInfo?.author || ""}</p>
            <p className="font-light text-2xl">{new Date(blogPostInfo?.created_at || -1).toLocaleString()}</p>
            <div className="flex gap-x-3.5 my-3">
                {blogPostInfo.tags.map(tag => <Tag title={tag} key={tag}/>)}
            </div>
        </div>
        <div>
            <MarkdownParser>
                {url}
            </MarkdownParser>
           
        </div></> || <LoadingPage/>}
    </Fade>
}