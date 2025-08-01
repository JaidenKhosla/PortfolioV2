"use server"

import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

const URL_EXPIRATION = 60; //in seconds
const fallbackImage = process.env.FALLBACK_IMAGE!;

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const supabase = createClient(process.env.SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!)

interface Request {
    link: string;
    date: number;
}

const cache: Map<string, Request> = new Map<string, Request>();

export default async function serveFile(bucketName:string, filePath: string) {

    const key = `${bucketName} ${filePath}`
    
    if (cache.has(key))
    {
        const req = cache.get(key);
        if(Date.now()-(req?.date!) < URL_EXPIRATION - 10 )
            return req?.link!;
    }

    const { data, error } = await supabase.storage.from(bucketName)?.createSignedUrl(filePath, URL_EXPIRATION);

    if(error) return fallbackImage;
    
    cache.set(key, {
        link: data?.signedUrl,
        date: Date.now()
    })

    return cache.get(key)!.link;
}

interface Project {
    id: number;
    created_at: Timestamp;
    title: string;
    description: string;
    link: string;
    tags: { tags: string[]}
}

export async function fetchAllProjects(){
    const projectData = await sql<Project[]>`SELECT * FROM projects`
    return projectData;
}

export async function fetchBlogPost(id: string){
    try{
        const url = await serveFile("blog", `${id}.md`);
        const text = await (await fetch(url)).text();

        return text;
    }
    catch(e){
        return "There was an error!";
    }

}

export interface BlogInfo {
    id: number;
    created_at: Timestamp;
    title: string;
    description: string;
    author: string;
    tags: string[];
}

export async function fetchBlogInfo(id: string){
    const blogInfo = await sql<BlogInfo[]>`SELECT * FROM blog where title=${id}`;

    if (blogInfo.length > 0)
        return blogInfo[0];
    
    return {
        id: -1,
        created_at: -1,
        title: "",
        author: ""
    }
}

export async function fetchBlogWrapper(id: string){
    return [await fetchBlogPost(id), await fetchBlogInfo(id)];
}

export async function fetchAllPostInfos(){
    const allPostInfos = await sql<BlogInfo[]>`SELECT * FROM blog`;
    return allPostInfos;
}