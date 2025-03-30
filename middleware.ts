import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Extract the access token manually
  const accessToken = req.cookies.get("sb-access-token")?.value;
  if (accessToken) {
    supabase.auth.setSession({ access_token: accessToken, refresh_token: "" });
  }

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  // Redirect if the user is not authenticated
  if (!user) {
    return NextResponse.redirect(new URL("/auth", req.url).toString());
  }

  return res;
}


// Protect specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/instruments/:path*"], // Protects /dashboard, /instruments, and their subpages
};

