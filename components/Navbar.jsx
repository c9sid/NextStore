import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center border-b border-neutral-300 p-5'>
            <div className="logo text-2xl">
                <Link href={'/'}>NextStore</Link>
            </div>
            <div className="menu hidden md:flex gap-5 items-center font-semibold">
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>Products</Link>
                <Link href={'/checkout'}>Checkout</Link>
            </div>
            <div className="btn">
                <button className='px-4 py-2 rounded-full bg-blue-500 text-white'><Link href={'/dashboard'}>Dashboard</Link></button>
            </div>
        </div>
    )
}

export default Navbar