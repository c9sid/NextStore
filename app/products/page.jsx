import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import prisma from "@/libs/prisma";

export default async function Products() {
    const products = await prisma.product.findMany(); // Fetch products from DB

    return (
        <div className="container mx-auto px-5">
            <section>
                <HeroSection pageName={'Products'} />
            </section>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 py-5">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </section>
        </div>
    );
}
