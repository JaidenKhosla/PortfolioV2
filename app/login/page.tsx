import LoginForm from "@/ui/login/LoginForm";
import { getCurrentUser } from "../../lib/auth/currentUser";

export default async function Page(){

    const user = await getCurrentUser();

    return <div>
        {user && <p>{user.userId} {user.role}</p>}
        <LoginForm/>
    </div>
}