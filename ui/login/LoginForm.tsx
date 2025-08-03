"use client"

const inputStyle = "w-full py-3 pl-3 rounded-xl border-white border-[0.1rem] focus:border-[0.1rem] focus:text-lg transition-all h-12"

export default function LoginForm(){
    return (
    <div className="text-white bg-cyan-950/30 w-fit p-8 rounded-4xl self-center justify-self-center flex flex-col items-center">
        <h1>Login</h1>
        <form className="w-fit flex flex-col gap-y-3 items-center">
       
        <div className="border-white border-[0.1rem] w-full"></div>
            <input className={inputStyle} type="text" placeholder="Email" name="email" aria-errormessage="emailError"/>
            {/* <div id="nameError">
                {state.errors?.name && state.errors.name.map(err => <p className="text-red-500 text-lg md:text-sm" key={err}>{err}</p>)}
            </div> */}
            <input className={inputStyle} type="text" placeholder="Password" name="password" aria-errormessage="oasswordError"/>
            {/* <div id="emailError">
                {state.errors?.email && state.errors.email.map(err => <p className="text-red-500 text-lg md:text-sm" key={err}>{err}</p>)}
            </div> */}
            {/* <textarea className={`${inputStyle} h-48`} placeholder="Your Message" name="message" aria-errormessage="messageError"></textarea> */}
            {/* <div id="messageError">
                {state.errors?.message && state.errors.message.map(err => <p className="text-red-500 text-lg md:text-sm" key={err}>{err}</p>)}
            </div> */}
            <button className="w-full p-3 border-[0.1rem] text-white rounded-xl transition-all hover:scale-105 hover:font-semibold h-min cursor-pointer" aria-errormessage="message">Send Message</button>
            {/* <div className="message">
                { state.msg && <p className={`text-lg md:text-sm ${state.errors ? "text-red-500" : "text-green-500"}`}>{state.msg}</p>}
            </div> */}
        </form>
    </div>
    );
}