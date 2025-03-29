"use client"
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const navLink = [
    {
        id: 1,
        name: "Home",
        href: "/"
    },
    {
        id: 2,
        name: "Products",
        href: "/products"
    },
    {
        id: 3,
        name: "Checkout",
        href: "/checkout"
    },
]

const Navbar = () => {

    const { isSignedIn } = useUser();
    const pathname = usePathname();

    return (
        <div className='z-50 sticky top-0 flex justify-between items-center bg-white/80 backdrop-blur-lg border-b border-neutral-300 p-5 max-h-[10vh]'>
            <div className="logo text-2xl font-bold">
                <Link className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600' href={'/'}>NextStore</Link>
            </div>
            <div className="menu hidden md:flex gap-5 items-center font-semibold">
                {navLink.map((menu) => (
                    <Link className={pathname === menu.href ? `text-blue-500` : `text-neutral-500 hover:text-blue-500`} key={menu.id} href={menu.href}>{menu.name}</Link>
                ))}
            </div>
            <div className="btn">
                {
                    isSignedIn ? (<div className='flex gap-3 items-center'>
                        <button className='px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-950 text-white cursor-pointer'><Link href={'/dashboard'}>Dashboard</Link></button>
                        <UserButton />
                    </div>) :
                        (<button className='px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-950 text-white cursor-pointer'><Link href={'/sign-in'}>Get Started</Link></button>)
                }
            </div>
        </div>
    )
}

export default Navbar