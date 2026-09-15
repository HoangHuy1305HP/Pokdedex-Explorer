import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import { TYPE_NAME, DEFAULT_TYPE } from "~/constants/pokemonTypes";
export function TypeDropdown() {
    const [isOpen,setIsOpen] = useState(false);
    const allTypes = ["fire", "water","grass","electric","bug","poison","flying","ground","fairy","fighting","psychic","rock","ice","ghost","dragon"]
    return (
        <div  className="z-50 relative  ">
            <Button className={`p-2 lg:p-6 lg:text-xl`} onClick={() => setIsOpen(!isOpen)}>
                <ChevronDown className="text-2xl"></ChevronDown>
                Loại Pokemon
            </Button>
            {isOpen && (
               <ul className="absolute max-h-[100px] overflow-y-auto lg:max-h-[200px] lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden  ">
                {allTypes.map((type) => (
                    <Link to={`/type/${type}`} onClick={() => setIsOpen(false)}>
                        <li key={type} className={`${TYPE_NAME[type].bg} ${TYPE_NAME[type].color}  rounded-sm text-center m-0.5 px-8  lg:px-18 lg:py-2`}>{type}</li>
                    </Link>
                    
                ))}
               </ul>
            )}
        </div>
    )
}