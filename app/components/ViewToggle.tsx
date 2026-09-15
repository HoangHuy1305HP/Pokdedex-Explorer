import { useState } from "react";
import {List} from "lucide-react";
import { Grid2X2 } from "lucide-react";
export default function ViewToggle({viewMode,setViewMode}: {viewMode:"grid"|"list",setViewMode: (mode:"grid"|"list") => void }) {
    
    return (
        <div className="flex gap-1 lg:gap-2">
            <Grid2X2 onClick={() => {setViewMode("grid")}}  className={viewMode==="grid" ? "bg-black text-white lg:size-12 size-10 rounded-sm p-2" : "bg-white lg:size-12 size-10 border-2 rounded-sm p-2" }></Grid2X2>
             <List onClick={() => setViewMode("list") } className={viewMode==="list" ?"bg-black text-white lg:size-12 size-10 rounded-sm p-2 border-2": "bg-white lg:size-12 size-10 p-2 border-2 border-black rounded-sm"}></List> 
            
        </div>  
       
    )
}