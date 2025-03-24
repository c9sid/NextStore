import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className='border border-neutral-300 rounded-md w-fit group hover:scale-[101%] relative'>
            <div className="img">
                <Link href={`/products/${product.id}`}>
                    <Image className='rounded-t-md' alt={product.imgAlt} width={350} height={350} src={product.imgUrl} loading='lazy' />
                </Link>
            </div>
            <div className="info p-3">
                <div className="Brand">
                    <p className='text-sm text-neutral-600'>{product.brand}</p>
                </div>
                <div className="name">
                    <Link href={`/products/${product.id}`}>
                        <h2 className='font-semibold group-hover:underline'>{product.productName}</h2>
                    </Link>
                </div>
                <div className="sale flex justify-between items-center">
                    <div className="price">
                        <p className='text-xl text-blue-500 font-semibold'>${product.price}</p>
                    </div>
                    <div className="promo">
                        <p className='text-sm text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full'>{product.promo}</p>
                    </div>
                </div>
                <Link href={'/cart'} className='cart hidden group-hover:block group-hover:animate-pulse group-hover:duration-300 bg-white rounded-full absolute top-3 right-3 z-10 p-2'>
                    <ShoppingCart />
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
