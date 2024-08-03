"use client"
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import Image from "next/image";
function Header() {

  const { setTheme } = useTheme()

  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between items-center">
      <div className="flex gap-2 items-center p-2 rounded-md max-w-lg">
        <div className="block" >
          <Link href={'/dashboard'}>
        <Image src={'/logo.png'} alt="logo" width={150} height={150}  className="inline md:hidden"/>
          </Link>
          </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <div className="inline md:hidden cursor-pointer">

      <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={'/dashboard'}>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Home
            </DropdownMenuItem>
            </Link>
            <Link href={'/dashboard/history'}>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              History
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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