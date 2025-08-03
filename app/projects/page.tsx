import Project from "@/ui/project/ProjectCard";

import { fetchAllProjects } from "@/lib/database";

export default async function Projects() {

    const projects = await fetchAllProjects();
    
    return (<>
        <h1>Projects</h1>
        <p className="ml-0.5 max-w-2xl text-base text-white leading-relaxed">{"Over the years, I've worked on many tiny projects (most are just little games I made to cure boredom). All of them are open source and on Github so feel free to check out the code. All of them are deployed through Github Pages."}</p>
        <div  className="py-20 flex gap-6 flex-wrap pr-5 max-w-2xl`">
            {
             projects.map(async (project)=>{
                return <Project key={project.title} title={project.title} description={project.description} link={project.link} tags={project.tags.tags}/>
            })
            }
        </div>
    </>);
}