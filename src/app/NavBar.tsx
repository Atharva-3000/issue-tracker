"use client";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname();
    const Links= [
        {heading:"Dashboard",href:"/"},
        {heading:"Issues",href:"/issues"}
    ]
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href={"/"}>
                <Bug size={42} />
            </Link>
            <ul className="flex space-x-6">
               {Links.map((link)=>{
                   return <li key={link.heading} className="font-semibold text-zinc-500 hover:text-zinc-800 text-lg transition-colors">
                       <Link href={link.href} key={link.heading}>
                           {link.heading}
                       </Link>
                   </li>
               })}
            </ul>
        </nav>
    )
}