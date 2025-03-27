import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const body = await req.json();
        const { upload_preset } = body;

        if (!upload_preset) {
            return new Response(JSON.stringify({ error: "Missing upload preset" }), { status: 400 });
        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            { timestamp, upload_preset },
            process.env.CLOUDINARY_API_SECRET
        );

        return new Response(JSON.stringify({ timestamp, signature }), { status: 200 });
    } catch (error) {
        console.error("❌ Cloudinary Signature Error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate signature" }), { status: 500 });
    }
}
