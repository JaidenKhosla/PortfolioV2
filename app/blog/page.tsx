import { fetchAllPostInfos } from "@/lib/database";
import PostOverview from "@/ui/blog/PostOverview";

export default async function BlogPage(){
    
    const blogPostInfos = await fetchAllPostInfos();

    return <div>
        {blogPostInfos.map(blogInfo => <PostOverview {...blogInfo} key={blogInfo.id}/>)}
    </div>
}