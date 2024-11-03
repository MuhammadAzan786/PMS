import { NextResponse } from "next/server";
import { createUser } from "../../../lib/actions/patient.action";

export async function POST(req: Request) {
  try {
    const { email, phone, name } = await req.json();

    // Call the createUser function with the provided data
    const newUser = await createUser({ email, phone, name });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error?.code || 500 }
    );
  }
}
