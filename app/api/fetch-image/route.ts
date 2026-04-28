import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const MAX_IMAGE_BYTES = 20 * 1024 * 1024; // 20 MB

function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local")) return true;
  if (h === "127.0.0.1" || h === "::1") return true;
  if (h.startsWith("10.") || h.startsWith("192.168.") || h.startsWith("169.254.")) return true;
  const m = h.match(/^172\.(\d+)\./);
  if (m) {
    const second = Number(m[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

function safeFilenameFromUrl(url: URL): string {
  const leaf = url.pathname.split("/").pop() || "remote-image";
  const clean = leaf.replace(/[^a-zA-Z0-9._-]/g, "_");
  return clean.length > 0 ? clean : "remote-image";
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url");
  if (!raw) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let remoteUrl: URL;
  try {
    remoteUrl = new URL(raw);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(remoteUrl.protocol)) {
    return NextResponse.json({ error: "Only http/https URLs are supported" }, { status: 400 });
  }
  if (isPrivateHost(remoteUrl.hostname)) {
    return NextResponse.json({ error: "Private network URLs are not allowed" }, { status: 400 });
  }

  try {
    const upstream = await fetch(remoteUrl.toString(), {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "PicConverter URL Import",
      },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: `Upstream responded ${upstream.status}` }, { status: 400 });
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("image/")) {
      return NextResponse.json({ error: "The URL did not return an image content-type" }, { status: 400 });
    }

    const contentLength = Number(upstream.headers.get("content-length") || "0");
    if (contentLength > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Image is too large (max 20MB)" }, { status: 413 });
    }

    const arrayBuffer = await upstream.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Image is too large (max 20MB)" }, { status: 413 });
    }

    const filename = safeFilenameFromUrl(remoteUrl);

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(arrayBuffer.byteLength),
        "X-Source-Filename": filename,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch remote image URL" }, { status: 502 });
  }
}
