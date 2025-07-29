"use client"
import { getAllBtnsFromYear } from "@/ui/githubStats/CalendarBtn";
import { useState } from "react";
import GitHubCalendar from "react-github-calendar";
const joinYear = 2020; //Too lazy to do env
const currYear = new Date().getFullYear()

export default function Calendar() { 
    
  const [year, setYear] = useState<number>(currYear)
  
  return (
    <div className="text-white pt-5 w-[50rem] p-5 my-5 bg-black/20 rounded-2xl">
      <h1 className="font-light text-2xl pb-4">Contribution Graph</h1>
      <GitHubCalendar username="jaidenkhosla" colorScheme="dark" year={year ? year : "last"} blockMargin={1}/>
      {getAllBtnsFromYear(joinYear, setYear, year)}
    </div>
    );   
}