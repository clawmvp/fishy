import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const auth = req.headers.get("authorization");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse("Server: ADMIN_PASSWORD missing", { status: 500 });
  }

  if (auth) {
    const [type, encoded] = auth.split(" ");
    if (type === "Basic" && encoded) {
      try {
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(":");
        if (user === "admin" && pass === expected) {
          return NextResponse.next();
        }
      } catch {
        // ignore decoding errors
      }
    }
  }

  return new NextResponse("Autentificare necesară", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="fishy admin"',
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
