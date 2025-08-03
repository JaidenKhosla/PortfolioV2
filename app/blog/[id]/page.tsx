"use client"

import { notFound, usePathname } from "next/navigation"
import BlogPost from "@/ui/blog/BlogPost";

export default function Page(){
  
    const blogID = usePathname().replace("/blog/", "");

    if(blogID == "") notFound();

    return <div className="text-white text-4xl flex justify-center">
      <BlogPost id={blogID.replace("%20"," ")}/>
    </div>
}