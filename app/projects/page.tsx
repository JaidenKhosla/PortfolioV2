import Project from "@/ui/project/ProjectCard";

export default function Projects() {
    return <div className="page pt-25">
        <h1 className="text-white text-5xl font-bold pb-4">Projects</h1>
        <p className="ml-0.5 max-w-2xl text-base text-white leading-relaxed">{"Over the years, I've worked on many tiny projects (most are just little games I made to cure boredom). All of them are open source and on Github so feel free to check out the code. All of them are deployed through Github Pages."}</p>
        <div  className="pt-10">
            <Project image="/images/tetrisGame.png" title="TetrisGame" description="A buggy 3D web game I made using the Godot Engine. Inspired by the million videos about recreating Tetris." link="https://github.com/JaidenKhosla/TetrisGame" tags={["Godot", "Github"]}/>
            {/* <Project image="/images/tetrisGame.png" title="TetrisGame" description="A buggy 3D web game I made using the Godot Engine. Inspired by the million videos about recreating Tetris." link="https://github.com/JaidenKhosla/TetrisGame" tags={["Godot", "Github"]}/> */}
        </div>
    </div>
}