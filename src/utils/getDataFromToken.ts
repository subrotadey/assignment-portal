
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

connect();

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 401 });
    }

    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    const decodedToken = jwt.verify(token, secret) as JwtPayload;

    return decodedToken.id;
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
