import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { v4 as uuidv4 } from "uuid";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // 1. Supabase Session (zabezpečí, že ak je prihlásený, session platí)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getClaims();

  if (!request.cookies.has("cart_id")) {
    const newCartId = uuidv4();
    console.log(newCartId);
    supabaseResponse.cookies.set("cart_id", newCartId, {
      path: "/",
      maxAge: 604800,
      httpOnly: false,
    });
  }

  const { data: { user } } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (user && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/profil', request.url));
  }

  if (!user && (path.startsWith('/objednavky') || path === '/profil')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const checkoutAuthorized = request.cookies.get('checkout_authorized')?.value;


if (path === '/platba') {
 
  if (checkoutAuthorized !== 'true') {
    return NextResponse.redirect(new URL('/kosik', request.url));
  }
}


  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};