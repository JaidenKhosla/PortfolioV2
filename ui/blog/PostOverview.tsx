import Link from "next/link"

import serveFile, { BlogInfo } from "@/lib/database"
import Tag from "@/ui/tags"
import ImageSkeleton from "@/ui/image/ImageSkeleton"

import { BiCalendar } from "react-icons/bi"
export default async function PostOverview({ id, created_at, title, description, author, tags } : BlogInfo){
    return <Link href={`/blog/${title}`} prefetch={true}>
                <section className="flex flex-col md:flex-row gap-x-10 text-white items-center bg-code-black w-fit px-15 py-10 md:py-5 md:pl-5 rounded-2xl group mb-5">
                <ImageSkeleton promise={serveFile("blog-images", title)} alt={title} width={1600} height={900} className="w-[48rem] h-[27rem] md:w-[24rem] md:h-[13.5rem] rounded-2xl transition-all group-hover:scale-105"/>
                <div className="flex flex-col gap-y-3 w-100 text-center items-center md:items-start md:p-0 py-10">
                    <h1 className="text-8xl md:text-5xl font-bold">{title}</h1>
                    <p className="text-wrap text-4xl md:text-2xl font-light md:text-start text-center">{description}</p>
                    <div className="flex gap-x-3">{tags.map(tag=><Tag title={tag} key={tag}/>)}</div>
                    <div className="flex items-center text-4xl md:text-xl"><BiCalendar size={"2rem"}/>{created_at.toLocaleString()}</div>
                </div>
        </section>
    </Link>
}