"use client"
import { register } from "@/lib/auth/databaseAuth";;
import { useActionState } from "react";
import type { userMessageSchema } from "@/lib/auth/databaseAuth";
import { getCurrentUser } from "../../lib/auth/currentUser";
import Form from "@/ui/form";
const inputStyle = ""

const initialState: userMessageSchema = {
    message: ""
}

export default function RegisterForm(){

    const bindedRegister = register.bind({ alterUserSession: false});

    const [ state, action ] = useActionState(bindedRegister, initialState);
    console.log(state);

    return (

    <Form title="Register" action={action}>
        <input placeholder="Email" name="email"/>
        <div id="nameError">
             {state.errors?.email && state.errors.email.map((err,idx) => <p className="error" key={`${err}-${idx}`}>{err}</p>)}
        </div>
        <input placeholder="Password" name="password" type="password"/>
        <div id="nameError">
             {state.errors?.password && state.errors.password.map((err,idx) => <p className="error" key={`${err}-${idx}`}>{err}</p>)}
        </div>
        <button aria-errormessage="message" type="submit">Register</button>
        <div className="message">
            { state.message && <p className="error">{state.message}</p>}
        </div>

    </Form>
    );
}