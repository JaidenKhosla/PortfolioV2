"use-client"

import { Dispatch, SetStateAction } from "react";
type setState = Dispatch<SetStateAction<number>>;
type selectedYear = number;

interface CalendarBtnProps {
    year: number;
    setState: setState;
    selectedYear: selectedYear;
}


export default function CalendarBtn({year, setState, selectedYear} : CalendarBtnProps){
    return <button className={`transition ${year!=selectedYear ? "hover:translate-y-[-0.25rem]" : ""} hover:text-gray-300 cursor-pointer text-4xl md:text-xl font-light ${year==selectedYear ? "translate-y-[0.3rem]" : ""}`} onClick={()=>setState(year)}>{year}</button>
}

export function getAllBtnsFromYear(year: number, setState: setState, selectedYear: selectedYear){
    
    const currYear: number = new Date().getFullYear();
    const amtOfYears = currYear-year;


    return <div className="flex gap-x-3  my-2 py-5 pb-0 border-t-indigo-100/30 border-t-[1px] justify-center md:justify-start">
        {Array.from({ length: amtOfYears+1}).map((_, idx)=>{
            return <CalendarBtn year={year+idx} setState={setState} selectedYear={selectedYear}  key={year+idx}/>;
        })}
    </div>
}