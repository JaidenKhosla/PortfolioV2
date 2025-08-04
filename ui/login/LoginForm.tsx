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

export default function LoginForm(){

    const [ state, action ] = useActionState(register, initialState);
    console.log(state);

    return (

    // <div className="text-white bg-cyan-950/30 w-300 md:w-fit h-[60rem] md:h-fit p-8 rounded-4xl self-center justify-self-center flex flex-col items-center">
    //     <h1>Login</h1>
    //     <form className="w-fit flex flex-col gap-y-12 md:gap-y-3 items-center" action={action}>
    //     <div className="border-white border-[0.1rem] w-full"></div>
    //         <input className={inputStyle} type="text" placeholder="Email" name="email" aria-errormessage="emailError"/>
    //         {/* <div id="nameError">
    //             {state.errors?.name && state.errors.name.map(err => <p className="text-red-500 text-lg md:text-sm" key={err}>{err}</p>)}
    //         </div> */}
    //         <input className={inputStyle} type="text" placeholder="Password" name="password" aria-errormessage="oasswordError"/>
    //         {/* <div id="emailError">
    //             {state.errors?.email && state.errors.email.map(err => <p className="text-red-500 text-lg md:text-sm" key={err}>{err}</p>)}
    //         </div> */}
    //         {/* <textarea className={`${inputStyle} h-48`} placeholder="Your Message" name="message" aria-errormessage="messageError"></textarea> */}
    //         {/* <div id="messageError">
    //             {state.errors?.message && state.errors.message.map(err => <p className="text-red-500 text-lg md:text-sm" key={err}>{err}</p>)}
    //         </div> */}
    //         <button className="text-6xl md:text-xl w-full p-3 border-[0.1rem] text-white rounded-xl transition-all hover:scale-105 hover:font-semibold h-32 md:h-min cursor-pointer" aria-errormessage="message" type="submit">Login</button>
    //         {/* <div className="message">
    //             { state.msg && <p className={`text-lg md:text-sm ${state.errors ? "text-red-500" : "text-green-500"}`}>{state.msg}</p>}
    //         </div> */}
    //     </form>
    // </div>

    <Form title="Login" action={action}>
        <input placeholder="Email" name="email"/>
        <div id="nameError">
             {state.errors?.email && state.errors.email.map((err,idx) => <p className="error" key={`${err}-${idx}`}>{err}</p>)}
        </div>
        <input placeholder="Password" name="password"/>
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