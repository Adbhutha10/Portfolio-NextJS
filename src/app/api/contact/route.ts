import { NextResponse } from "next/server";

/**
 * CONTACT API ROUTE (Web3Forms Integration)
 * This route forwards contact form messages to your email via Web3Forms.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // 1. Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Forward to Web3Forms
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
        console.error("[Configuration Error] WEB3FORMS_ACCESS_KEY is missing in env.");
        return NextResponse.json({ 
            error: "Service Configuration Error", 
            details: "API Key not found on server. Please check environment variables." 
        }, { status: 500 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            access_key: accessKey,
            name,
            email,
            message,
            from_name: "Portfolio Inquiry",
            subject: `New Message from ${name} via Portfolio`,
        }),
    });

    // Check if the response is actually JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("[Web3Forms Text Error]", errorText);
        return NextResponse.json({ 
            error: "Service Error", 
            details: "Web3Forms returned a non-JSON response. Check API key and domain." 
        }, { status: 500 });
    }

    const result = await response.json();

    if (result.success) {
        return NextResponse.json({ success: true }, { status: 200 });
    } else {
        console.error("[Web3Forms API Error]", result);
        return NextResponse.json({ 
            error: "Service Error", 
            details: result.message || "Unknown error" 
        }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Contact API Error:", error.message || error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
