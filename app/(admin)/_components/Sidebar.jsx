"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const dashboardMenu = [
    {
        id: 1,
        name: "Overview",
        href: "/dashboard"
    },
    {
        id: 2,
        name: "Add Product",
        href: "/dashboard/add-new-product"
    },
    {
        id: 3,
        name: "All Products",
        href: "/dashboard/products"
    },
]


const Sidebar = () => {

    const path = usePathname();

    return (
        <div>
            <div className="menu flex flex-col gap-3">
                {dashboardMenu.map((menu) => (
                    <Link className={path === menu.href ? `text-blue-500` : `text-neutral-500`} key={menu.id} href={menu.href}>{menu.name}</Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar