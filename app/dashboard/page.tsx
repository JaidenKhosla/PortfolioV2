import MarkdownEditor from "@/ui/dashboard/MarkdownEditor";

import { redirect } from "next/navigation";

export default async function DashboardPage(){
    
    return <div className="pb-10">
        <h1>Blog Editor</h1>
        <MarkdownEditor/>
    </div>

}