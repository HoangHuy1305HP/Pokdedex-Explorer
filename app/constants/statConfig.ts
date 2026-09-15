import { Heart, Swords, Shield, Sparkles, Wind } from "lucide-react";
export const STAT_CONFIG: Record<string, {
    label:string,
    icon:any,
    color:string,
    bg:string,
}> = {
     hp: { label: "HP", icon: Heart, color: "text-red-500", bg: "bg-red-100" },
    attack: { label: "Tấn công", icon: Swords, color: "text-orange-500", bg: "bg-orange-100" },
    defense: { label: "Phòng thủ", icon: Shield, color: "text-blue-500", bg: "bg-blue-100" },
    "special-attack": { label: "Tấn công đặc biệt", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-100" },
    "special-defense": { label: "Phòng thủ đặc biệt", icon: Shield, color: "text-indigo-500", bg: "bg-indigo-100" },
    speed: { label: "Tốc độ", icon: Wind, color: "text-green-500", bg: "bg-green-100" },
};


