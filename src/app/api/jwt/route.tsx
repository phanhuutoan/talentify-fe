import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const body = await req.json();
  cookieStore.set("auth", JSON.stringify(body));
  return new NextResponse();
}

export async function DELETE() {
  console.log("DELETE COOKIE");
  const cookieStore = await cookies();
  cookieStore.delete("auth");
  return new NextResponse();
}
