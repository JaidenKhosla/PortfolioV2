import MiniLinkContainer from "@/ui/minilink/MiniLinkContainer"
import ImageSkeleton from "@/ui/image/ImageSkeleton"
import Calendar from "@/ui/githubStats/Calendar"

export default async function Home(){
  return (
    <>
    <div className="flex gap-x-10 items-center flex-col md:flex-row gap-y-6">
      <div className="flex flex-col items-center gap-y-6">
        <ImageSkeleton priority={true} src="/images/JaidenKhosla.png" width={1932} height={3013} alt="Jaiden Khosla"  draggable={false} className=" object-cover w-[30rem] h-[30rem] md:w-75 md:h-75 rounded-full mt-10"/>
      </div>
      <div>
        <p className="font-semibold text-white w-xl">I'm <strong>Jaiden Khosla</strong>. A developer primarily interested in web development. I focus mainly on Full Stack with NextJS as my main framework.</p>
        <p className="font-semibold text-white w-lg"></p>
        <p className="font-semibold text-white w-xl pt-4">I have a deep passion for learning all things</p>
        <p className="font-extrabold text-white w-xl overflow-hidden whitespace-nowrap">Computer Science.</p>
      </div>
    </div>
    {/* Mini Links Container */}
    <MiniLinkContainer/>
    <Calendar/>
  </>);
}