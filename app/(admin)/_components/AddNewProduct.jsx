"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewProduct = () => {
    const [product, setProduct] = useState({
        productName: "",
        brand: "",
        price: "",
        promo: "",
        imageUrl: "",
        description: "",
        stock: 0,
        category: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const route = useRouter();

    // Handle File Selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Upload Image to Cloudinary
    const uploadImage = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "main_preset"); // Cloudinary preset

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/c9sid/image/upload",
                { method: "POST", body: formData }
            );

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
            return null;
        }
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const imageUrl = await uploadImage();

        const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...product, imageUrl }),
        });

        setLoading(false);

        if (response.ok) {
            alert("Product Added!");
            setProduct({
                productName: "",
                brand: "",
                price: "",
                promo: "",
                imageUrl: "",
                description: "",
                stock: 0,
                category: "",
            });
            setImageFile(null);
            setImagePreview(null);
            route.push('/');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input className="outline-none ring-1 ring-neutral-400  px-4 py-2 focus:ring-blue-400 focus:ring-2  rounded-md w-full" type="text" placeholder="Product Name" value={product.productName} onChange={(e) => setProduct({ ...product, productName: e.target.value })} required />
                <input className="outline-none ring-1 ring-neutral-400  px-4 py-2 focus:ring-blue-400 focus:ring-2  rounded-md w-full" type="text" placeholder="Brand" value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })} required />
                <input className="outline-none ring-1 ring-neutral-400  px-4 py-2 focus:ring-blue-400 focus:ring-2  rounded-md w-full" type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
                <input className="outline-none ring-1 ring-neutral-400  px-4 py-2 focus:ring-blue-400 focus:ring-2  rounded-md w-full" type="text" placeholder="Promo" value={product.promo} onChange={(e) => setProduct({ ...product, promo: e.target.value })} />
                <textarea className="outline-none ring-1 ring-neutral-400  px-4 py-2 focus:ring-blue-400 focus:ring-2  rounded-md w-full" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
                <input className="outline-none ring-1 ring-neutral-400  px-4 py-2 focus:ring-blue-400 focus:ring-2  rounded-md w-full" type="number" placeholder="Stock" value={product.stock} onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })} required />
                <input className="outline-none ring-1 ring-neutral-400  px-4 py-2 focus:ring-blue-400 focus:ring-2  rounded-md w-full" type="text" placeholder="Category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} required />

                {/* Image Upload */}
                <label className="group outline-none ring-1 ring-neutral-400 hover:ring-2 hover:ring-blue-400 p-5 rounded-md w-full flex items-center justify-center gap-2 cursor-pointer text-neutral-400">
                    <Upload className="w-5 h-5 group-hover:text-blue-400" /><span className="group-hover:text-blue-400">Upload Image</span>
                    <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" required />
                </label>

                {/* Image Preview */}
                {imagePreview && (
                    <Image src={imagePreview} alt="Preview" width={150} height={150} className="rounded-lg shadow-md" />
                )}

                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-blue-600" disabled={loading}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddNewProduct;
