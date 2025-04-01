
    import { NextResponse } from "next/server";
    import { supabase } from "@/utils/supabase/client";

    export async function POST(req: Request) {
    try {
        console.log("📨 API received a request...");

        const { name, url } = await req.json();
        console.log("🔍 Parsed input:", { name, url });

        if (!name || !url) {
        console.log("❌ Missing name or url");
        return NextResponse.json(
            { message: "Name and URL are required" },
            { status: 400 }
        );
        }

        const { data, error } = await supabase.from("apps").insert([
        { name, dir: url, created_at: new Date().toISOString() },
        ]);

        if (error) {
        console.error("🔥 Supabase error:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
        }

        console.log("✅ Insert successful:", data);
        return NextResponse.json({ message: "App added successfully!" });
    } catch (error) {
        console.error("🛑 Server error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
    }
