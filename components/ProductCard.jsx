import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className='border border-neutral-300 rounded-md w-fit group hover:shadow-2xl relative'>
            <div className="img">
                <Link href={`/products/${product.slug}`}>
                    <Image
                        className='rounded-t-md'
                        alt={product.productName}
                        width={350}
                        height={350}
                        src={product.imageUrl || "/T-Shirt/placeholder.png"}
                        priority
                    />
                </Link>
            </div>
            <div className="info p-3">
                <p className='text-sm text-neutral-600'>{product.brand}</p>
                <Link href={`/products/${product.slug}`}>
                    <h2 className='font-semibold group-hover:underline'>{product.productName}</h2>
                </Link>
                <p className='text-sm text-gray-500'>Category: {product.category}</p>
                <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </p>
                <div className="sale flex justify-between items-center">
                    <p className='text-xl text-blue-500 font-semibold'>${product.price.toString()}</p>
                    <p className='text-sm text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full'>{product.promo}</p>
                </div>
                <Link href={'/cart'} className='cart hidden group-hover:block bg-white rounded-full absolute top-3 right-3 z-10 p-2'>
                    <ShoppingCart />
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
