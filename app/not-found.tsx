import Link from "next/link";

export default function NotFound(){
    return <div className="w-full h-screen flex flex-col items-center">
        <p className="text-[18rem] text-white font-bold text-center">404</p>
        <p className="text-4xl text-white font-extralight mt-[-5rem] text-center">Consider going back to the Home page!</p>
        <Link href="/" className="mt-5 p-3 px-4 rounded-2xl text-white hover:scale-105 transition-all bg-slate-800/60">Home</Link>
    </div>
}