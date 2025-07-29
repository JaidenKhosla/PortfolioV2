"use server"

import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const supabase = createClient(process.env.SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function serveImage(bucketName:string, filePath: string) {

    const { data, error } = await supabase.storage.from(bucketName)?.createSignedUrl(filePath, 60);

    if(error) throw error;

    return data?.signedUrl;
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