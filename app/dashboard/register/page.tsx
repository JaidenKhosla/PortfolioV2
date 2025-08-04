import { getUserFromSesssion } from "../../../lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import RegisterForm from "@/ui/registerTable/Register";

export default async function RegisterPage(){

    const user = await getUserFromSesssion(await cookies())
    if(user == null)
        redirect("/login")

    return <div className="pb-10 flex flex-col items-center">
        <h1>Add User</h1>
        <RegisterForm/>
    </div>

}