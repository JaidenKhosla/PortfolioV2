"use client"

import { Children, ReactElement, RefObject, useEffect, useState } from "react"

import { useRef } from "react"

interface FadeProps {
    children: React.ReactNode;
    className?: string
}

export default function Fade({ children, className }: FadeProps){

    const DOMReference = useRef<HTMLDivElement|null>(null);
    const [isVisible, setVisible] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => setVisible(entry.isIntersecting));
            });
            if(DOMReference.current){
                observer.observe(DOMReference.current)
                return () => observer.unobserve(DOMReference.current!)
    
            }
        })
    }, [])

    return <div className={`fadeIn${ isVisible ? "-visible" : ""} ${className}`} ref={DOMReference}>
        {children}
    </div>
}