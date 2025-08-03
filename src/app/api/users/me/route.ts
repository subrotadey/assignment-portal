import { getDataFromToken } from '@/utils/getDataFromToken';
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // extract data from token
    const userId = await getDataFromToken(request)

    const user = await User.findOne({_id:userId}).select("-password")

    // check id there is no user
    return NextResponse.json({
      message: "User Found",
      data: user
    })

    
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
