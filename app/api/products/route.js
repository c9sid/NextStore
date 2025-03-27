import { PrismaClient } from "@prisma/client";
import { slugify } from "@/utils/slugify"; // Utility function for slugs

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { productName, brand, price, promo, imageUrl, description, stock, category } = await req.json();

        const slug = slugify(productName); // Generate slug from product name

        const product = await prisma.product.create({
            data: {
                productName,
                slug,
                brand,
                price: parseFloat(price),
                promo,
                imageUrl,
                description,
                stock: parseInt(stock, 10),
                category,
            },
        });

        return new Response(JSON.stringify(product), { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return new Response(JSON.stringify({ error: "Failed to create product" }), { status: 500 });
    }
}
