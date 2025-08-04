import ImageSkeleton from "@/ui/image/ImageSkeleton"
import Fade from "@/ui/fadeIn/Fade"

export default function Page(){
    return <>
     <Fade className="flex gap-x-10 items-center justify-end flex-col gap-y-10 md:flex-row-reverse">
        <ImageSkeleton priority={true} src="/images/JaidenKhosla.png" width={1932} height={3013} alt="Jaiden Khosla"  draggable={false} className=" object-cover w-[50rem] h-[50rem] md:w-95 md:h-95 rounded-2xl mt-10"/>
        <div className="w-[50rem]">
            <h1>About Me</h1>
            <p>{`I'm an aspiring web developer with a primary focus of building full-stack application using technologies such as Next.js, React, Typescript, and Python.`}</p>
            <br/>
            <p>{`In my free time, I enjoy building tools to fix problems in my daily life or things to cure boredom (check out the projects page).`}</p>
            <br/>
            <p>{`Currently, I'm in my sophomore year of high school, where I'm involved with organizations such as JETCOMPSCI, FBLA, and KC.`}</p>
            <br/>
            <p className="font-bold">{`Feel free to reach out to me if needed.`}</p>
        </div>
     </Fade>
    </>
}