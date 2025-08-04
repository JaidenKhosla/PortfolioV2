import {redirect} from "next/navigation"
import { getUserFromSesssion } from "../../lib/auth/session"
import { cookies } from "next/headers"
import Link from "next/link"
import { logOut } from "../../lib/auth/databaseAuth"

export default async function DashboardPage() {
    const user = await getUserFromSesssion(await cookies())
    if(user == null)
        redirect("/login")


    return <div className="flex">
        <Link href="/dashboard/editor" className="p-3 bg-slate-800 rounded-2xl transition-all hover:scale-105">Blog Editor</Link>
        <Link href="/dashboard/register" className="p-3 bg-slate-800 rounded-2xl transition-all hover:scale-105">Register User</Link>
        <Link onClick={logOut} href={"/login"} className="p-3 bg-slate-800 rounded-2xl transition-all hover:scale-105">Logout</Link>
    </div>
}