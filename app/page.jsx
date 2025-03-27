import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import prisma from "@/libs/prisma";

export default async function Home() {
  const products = await prisma.product.findMany(); // Fetch products from DB

  return (
    <div>
      <section>
        <HeroSection pageName={"Home"} />
      </section>
      <section>
        <div className="flex justify-between items-center pt-5 pb-3">
          <h3 className="text-xl">All Products</h3>
          <Link className="inline-flex items-center gap-2 hover:text-blue-500 hover:scale-95" href={'/products'}>View all <ArrowRight /> </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.slice(0, 5).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
