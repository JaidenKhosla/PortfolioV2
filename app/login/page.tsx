import LoginForm from "@/ui/login/LoginForm";
import { getCurrentUser } from "../../lib/auth/currentUser";
import RegisterForm from "../../ui/registerTable/Register";

export default async function Page(){

    const user = await getCurrentUser();

    return <div>
        <LoginForm/>
    </div>
}