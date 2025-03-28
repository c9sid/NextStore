import HeroSection from '@/components/HeroSection';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

const getProductBySlug = async (slug) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

const SingleProduct = async ({ params }) => {
    const { slug } = await params;
    const productData = await getProductBySlug(slug);

    if (!productData) {
        return <div className="text-center text-red-500 text-xl mt-10">Product Not Found</div>;
    }

    return (
        <div>
            {/* Hero Section */}
            <section>
                <HeroSection pageName={productData.productName} />
            </section>

            <section className="grid md:grid-cols-2 gap-10 mt-6 items-center">
                <div className="flex justify-center md:justify-start">
                    <Image
                        src={productData.imageUrl}
                        alt={productData.productName}
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg object-cover w-full max-w-[400px]"
                        priority
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-semibold">{productData.productName}</h2>
                    <p className="text-lg text-gray-600">
                        Brand: <span className="font-medium">{productData.brand}</span>
                    </p>

                    <div className="flex items-center gap-4">
                        <p className="text-2xl font-bold text-blue-500">${productData.price}</p>
                        {productData.promo && (
                            <span className="text-sm bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">
                                {productData.promo}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-700">{productData.description}</p>

                    <div className="flex gap-4 mt-4">
                        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
                            Buy Now
                        </button>
                        <button className="bg-gray-100 text-gray-800 py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition cursor-pointer">
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SingleProduct;
