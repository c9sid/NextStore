import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { product } from '@/libs/product';
import React from 'react';

const Products = () => {
    return (
        <div>
            <section>
                <HeroSection pageName={'Products'} />
            </section>
            <section className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-5 pb-3">
                {product.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </section>
        </div>
    );
};

export default Products;
