import { NextResponse } from "next/server";

/** Optional serverless hook for future pipelines; MVP stays client-side. */
export async function POST() {
  return NextResponse.json(
    { error: "Not implemented", hint: "Use the in-browser converter on PicConverter pages." },
    { status: 501 }
  );
}
