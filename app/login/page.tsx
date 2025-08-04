import LoginForm from "@/ui/login/LoginForm";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { redirect } from "next/navigation";

export default async function Page(){

    const user = await getCurrentUser();
    if(user!=null) redirect("/dashboard")
        
    return <div>
        <LoginForm/>
    </div>
}