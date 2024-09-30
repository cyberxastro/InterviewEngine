"use client"
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Button } from "../../../components/ui/button";
function Header() {

    const path = usePathname();
    const { setTheme } = useTheme()
    return (
        <div
            className="flex p-4 items-center justify-between bg-secondary shadow-sm"
        >

            <Link href={'/dashboard'}>

            <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
            </Link>
            <ul
                className="hidden md:flex gap-6"
            >   <Link href={'/dashboard'}>
                    <li
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard' && 'text-primary font-bold'}`}
                    >Dashboard</li>
                </Link>
                {/* <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/questions'&&'text-primary font-bold'}`}
            >Questions</li> */}
                {/* <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/upgrade'&&'text-primary font-bold'}`}
            >Upgrade</li> */}
                <Link href={'#'} target="_blank">
                    <li
                        className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/how' && 'text-primary font-bold'}`}
                    >How it works?</li>
                </Link>
            </ul>
            <div className="flex gap-5">

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <UserButton />
            </div>
        </div>
    )
}

export default Header
