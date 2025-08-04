import { fetchAllPostInfos } from "@/lib/database";
import PostOverview from "@/ui/blog/PostOverview";
import Fade from "@/ui/fadeIn/Fade";

export default async function BlogPage(){
    
    const blogPostInfos = await fetchAllPostInfos();

    return <Fade className="">
        {blogPostInfos.map(blogInfo => <PostOverview {...blogInfo} key={blogInfo.id}/>)}
    </Fade>
}