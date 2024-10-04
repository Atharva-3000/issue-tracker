"use client";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
export default function NavBar() {
    const currentPath = usePathname();
    const Links = [
        { heading: "Dashboard", href: "/" },
        { heading: "Issues", href: "/issues" }
    ]
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href={"/"}>
                <Bug size={42} />
            </Link>
            <ul className="flex space-x-6">
                {Links.map((link) => {
                    return <li key={link.heading} className="text-zinc-500 hover:text-zinc-800 text-lg transition-colors">
                        <Link href={link.href} key={link.heading}
                            className={classnames({
                                'text-zinc-900': link.href === currentPath,
                                'text-zinc-500': link.href !== currentPath,
                                'hover:text-zinc-800 transition-colors': true,
                            })}
                        >
                            {link.heading}
                        </Link>
                    </li>
                })}
            </ul>
        </nav>
    )
}