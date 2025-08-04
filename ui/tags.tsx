
import { IconType } from "react-icons";
import { DiJavascript, DiJava, DiPython, DiCss3, DiGit, DiTerminal, DiNpm} from "react-icons/di";
import { SiTailwindcss, SiTypescript, SiHtml5, SiReact, SiNextdotjs, SiGodotengine, SiGithub } from "react-icons/si";

const tagsToIcon: { [ tag: string ] : [IconType, string]} = {
    "JS" : [DiJavascript, "bg-yellow-400"],
    "Java" : [DiJava, "bg-orange-500"],
    "Python" : [DiPython, "bg-sky-600"],
    "CSS" : [DiCss3, "bg-violet-600"],
    "Tailwind" : [SiTailwindcss, "bg-cyan-300"],
    "TS" : [SiTypescript, "bg-blue-500"],
    "HTML" : [SiHtml5, "bg-red-500"],
    "React" : [SiReact, "bg-sky-400"],
    "Next" : [SiNextdotjs, "bg-neutral-950"],
    "Godot" : [SiGodotengine, "bg-cyan-700"],
    "Github" : [SiGithub, "bg-slate-800"],
    "Git" : [DiGit, "bg-purple-600"],
    "Terminal" : [DiTerminal, "bg-gray-600"],
    "Npm" : [DiNpm, "bg-orange-700"],

}

export default function Tag({ title }: { title: string }){
    const [ Icon, color ] = tagsToIcon[title]!
    return (
    <div className={`${color} flex gap-x-1 items-center p-2 md:p-0.5 md:px-1.5 w-fit rounded-lg`}>
        <Icon className="text-5xl md:text-xl"/>
        <p className="text-4xl md:text-xl">{title}</p>
    </div>);
}
