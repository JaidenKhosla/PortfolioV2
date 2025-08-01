import Image from "next/image"
import MiniLinkContainer from "@/ui/minilink/MiniLinkContainer"
import ImageSkeleton from "@/ui/image/ImageSkeleton"
import Calendar from "@/ui/githubStats/Calendar"

export default async function Home(){
  return (
    <>
    <div className="self-center flex items-center gap-12">
      <div className="flex flex-col items-center gap-y-6">
        <ImageSkeleton priority={true} src="/images/JaidenKhosla.png" width={1932} height={3013} alt="Jaiden Khosla"  draggable={false} className=" object-cover w-75 rounded-full h-75 mt-10"/>
      </div>
      <div>
        <p className="font-semibold text-white text-xl w-xl inline">{"I'm "}</p>
        <p className="inline font-extrabold text-2xl text-white">Jaiden Khosla.</p> 
        <p className="font-semibold text-white text-xl w-lg">A developer primarily interested in web development. I focus mainly on Full Stack with NextJS as my main framework.</p>
        <p className="font-semibold text-white text-xl w-xl pt-4">I have a deep passion for learning all things</p>
        <p className="font-extrabold text-white text-xl w-xl overflow-hidden whitespace-nowrap">Computer Science.</p>
      </div>
    </div>
    {/* Mini Links Container */}
    <MiniLinkContainer/>
    <Calendar/>
  </>);
}