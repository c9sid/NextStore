import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { product } from "@/libs/product";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {product.slice(0, 5).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}