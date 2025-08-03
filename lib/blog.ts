"use server"

import * as zod from "zod";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

// const  BlogCreationInfoSchema = zod({
//     title: string;
//     description: string;
//     tags?: string[];
//     content: string;
//     uuid: string;
// })

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const supabase = createClient(process.env.SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!)

const blogCreationInfoSchema = zod.object({
    title: zod.string().nonempty("Must have a title."),
    author: zod.string().nonempty("Must have an author"),
    description: zod.string().nonempty("Must have a description"),
    tags: zod.string(),
    content: zod.string().nonempty("Must have content."),
    uuid: zod.string().nonempty()
})

export type blogCreationSchema = {
    message?: string|null,
    errors?: {
        title?: string[],
        author?: string[],
        description?: string[],
        tags?: string[],
        content?: string[],
        uuid?: string[]
    }
}

export default async function createBlogPost(prevState: blogCreationSchema, formData: FormData): Promise<blogCreationSchema> {
    const parsedData = blogCreationInfoSchema.safeParse({
        title: formData.get("title"),
        author: formData.get("author"),
        description: formData.get("description"),
        tags: formData.get("tags"),
        content: formData.get("content"),
        uuid: formData.get("uuid")
    });

    if(parsedData.error)
        return {
            message: "There was an error.",
            errors: parsedData.error.flatten().fieldErrors
        }

    const { title, description, author, tags, content, uuid } = parsedData.data;

    await sql`INSERT INTO blog (title, description, author, tags, uuid) VALUES (${title}, ${description}, ${author}, ${tags.split(",")}, ${uuid});`

   const buffer = Buffer.from(content, "utf-8");

    supabase.storage.from("blog").upload(`${title}.md`, buffer, {
        contentType: "file/markdown"
    })

    return {
        message: "success!"
    };
}  