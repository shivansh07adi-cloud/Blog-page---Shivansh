"use client";
import {useEffect,useState} from "react";
export function ReadingProgress(){const [progress,setProgress]=useState(0);useEffect(()=>{const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?Math.min(100,scrollY/max*100):0)};addEventListener("scroll",update,{passive:true});update();return()=>removeEventListener("scroll",update)},[]);return <div className="reading-progress" aria-hidden="true" style={{transform:`scaleX(${progress/100})`}}/>}
