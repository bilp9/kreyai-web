import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="KreyAI Ops"',
    },
  });
}

export function middleware(request: NextRequest) {
  const username = process.env.OPS_DASHBOARD_USERNAME?.trim();
  const password = process.env.OPS_DASHBOARD_PASSWORD?.trim();

  if (!username || !password) {
    return new NextResponse("Ops dashboard auth is not configured.", {
      status: 503,
    });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encodedCredentials = authorization.slice("Basic ".length);

  try {
    const decoded = atob(encodedCredentials);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return unauthorizedResponse();
    }

    const suppliedUsername = decoded.slice(0, separatorIndex).trim();
    const suppliedPassword = decoded.slice(separatorIndex + 1).trim();

    if (suppliedUsername !== username || suppliedPassword !== password) {
      return unauthorizedResponse();
    }
  } catch {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ops/:path*"],
};
