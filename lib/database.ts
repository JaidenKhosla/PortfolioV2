"use server"

import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";


const URL_EXPIRATION = 60; //in seconds
const BUFFER = 5;


const fallbackImage = process.env.FALLBACK_IMAGE!;

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const supabase = createClient(process.env.SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!)

const cache: Map<string, string> = new Map<string, string>();

export default async function serveFile(bucketName:string, filePath: string) {
    try{

        const key = `${bucketName} ${filePath}`
        const currDate = Math.floor(Date.now()/1000);
    
        if (cache.has(key))
        {
            const req = cache.get(key);
            if(req)
            return req;
        }
    
        const bucket = await supabase.storage.from(bucketName);

        const { error, data } = await bucket.exists(filePath);
    
        if(error) return fallbackImage;
        
        const url = bucket.getPublicUrl(filePath);
    
        const unsafeURL = url.data.publicUrl;

        const publicUrl = unsafeURL ? unsafeURL : fallbackImage;

        cache.set(key, publicUrl)

        return publicUrl;
        
    }
    catch{
        return fallbackImage;
    }
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
    catch{
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
    uuid: string,
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

export async function uploadFile(file: File, blogUuid?: string){
    const fileName = blogUuid ? `${file.name}-${blogUuid}` : file.name;
    supabase.storage.from("blog-images").upload(fileName, file, {
        upsert: true
    })
}
