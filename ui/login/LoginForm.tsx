"use client"
import { signIn } from "@/lib/auth/databaseAuth";;
import { useActionState } from "react";
import type { userMessageSchema } from "@/lib/auth/databaseAuth";
import { getCurrentUser } from "@/lib/auth/currentUser";
import Form from "@/ui/form";
const inputStyle = ""

const initialState: userMessageSchema = {
    message: ""
}

export default function LoginForm(){

    const [ state, action ] = useActionState(signIn, initialState);
    console.log(state);

    return (

    <Form title="Login" action={action}>
        <input placeholder="Email" name="email" autoComplete="on"/>
        <div id="nameError">
             {state.errors?.email && state.errors.email.map((err,idx) => <p className="error" key={`${err}-${idx}`}>{err}</p>)}
        </div>
        <input placeholder="Password" name="password" type="password" autoComplete="on"/>
        <div id="nameError">
             {state.errors?.password && state.errors.password.map((err,idx) => <p className="error" key={`${err}-${idx}`}>{err}</p>)}
        </div>
        <button aria-errormessage="message" type="submit">Login</button>
        <div className="message">
            { state.message && <p className="error">{state.message}</p>}
        </div>

    </Form>
    );
}