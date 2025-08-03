import MarkdownEditor from "@/ui/dashboard/MarkdownEditor";

import { getServerSession }from "next-auth/next";
import { authOptions } from "@/lib/auth/authConfig";
import { redirect } from "next/navigation";

export default async function DashboardPage(){
    
    const session = await getServerSession(authOptions);

    if(!session)
        redirect("/login")

    
    return <div className="pb-10">
        <h1>Blog Editor</h1>
        <MarkdownEditor/>
    </div>

}