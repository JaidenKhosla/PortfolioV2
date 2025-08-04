import MarkdownEditor from "@/ui/dashboard/MarkdownEditor";
import { getUserFromSesssion } from "../../../lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export default async function DashboardPage(){

    const user = await getUserFromSesssion(await cookies())
    if(user == null)
        redirect("/login")

    return <div className="pb-10">
        <h1>Blog Editor</h1>
        <MarkdownEditor/>
    </div>

}