import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ message: "Hello" });
};
export const POST = async (req: NextRequest, res: NextResponse) => {};
