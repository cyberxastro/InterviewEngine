"use client"
import { History, Home, Settings, WalletIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import path from "path";
import React, { useEffect } from "react";
import Link from "next/link";

function SideNav() {

    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: History,
            path: '/dashboard/history'
        }
    ]

    const path = usePathname();
    useEffect(() => {
    }, [])

    return (
        <div className="h-screen relative p-5 shadow-sm border">
            <div className="flex justify-center ">
                <Link href={'/dashboard'}>
                <Image src={'/logo.png'} alt="logo" width={150} height={150} />
                </Link>
            </div>
            <hr className="my-6 border" />
            <div className="mt-3">
                {MenuList.map((menu, index) => (
                    <Link href={menu.path}>
                        <div className={`flex gap-2 mb-2 p-3 cursor-pointer 
                    hover:bg-primary hover:text-secondary rounded-lg cursor-pointer
                    ${path == menu.path && 'bg-primary text-secondary'}
                    `}>
                            <menu.icon className="h-6 w-6" />
                            <h2 className="text-lg">{menu.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideNav