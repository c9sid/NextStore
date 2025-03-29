import Image from "next/image";
import { ShoppingCart, CheckCircle, XCircle, Tag } from "lucide-react";

const getProductBySlug = async (slug) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};

const SingleProduct = async ({ params }) => {
    const { slug } = await params;
    const productData = await getProductBySlug(slug);

    if (!productData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <XCircle className="w-16 h-16 text-red-500" />
                <h2 className="text-3xl font-semibold text-gray-800 mt-4">Product Not Found</h2>
                <p className="text-gray-600 mt-2">We couldn't find the product you're looking for.</p>
                <a href="/" className="mt-4 text-blue-500 hover:underline">
                    Return to Homepage
                </a>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-5 md:px-12 lg:px-20 py-10">
            {/* Product Details Section */}
            <section className="grid md:grid-cols-2 gap-10 items-start">
                {/* Product Image */}
                <div className="flex justify-center md:justify-start">
                    <Image
                        src={productData.imageUrl}
                        alt={productData.productName}
                        width={500}
                        height={500}
                        className="rounded-xl shadow-lg object-cover w-full max-w-[500px]"
                        priority
                    />
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-gray-900">{productData.productName}</h2>

                    <div className="flex items-center gap-3">
                        <span className="text-lg text-gray-600">Brand:</span>
                        <span className="font-medium text-gray-800">{productData.brand}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-3xl font-extrabold text-blue-600">${productData.price}</p>
                        {productData.promo && (
                            <span className="text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full">
                                {productData.promo}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">{productData.description}</p>

                    {/* Category & Stock Status */}
                    <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-2 text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                            <Tag className="w-4 h-4" /> {productData.category}
                        </span>
                        <span
                            className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${productData.stock > 0 ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                }`}
                        >
                            {productData.stock > 0 ? (
                                <>
                                    <CheckCircle className="w-4 h-4" /> In Stock
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-4 h-4" /> Out of Stock
                                </>
                            )}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                            disabled={productData.stock === 0}
                        >
                            Buy Now
                        </button>
                        <button
                            className="bg-gray-100 text-gray-800 py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition cursor-pointer"
                            disabled={productData.stock === 0}
                        >
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SingleProduct;
