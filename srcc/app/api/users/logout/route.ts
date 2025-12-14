import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/users/logout
 * @description logout user
 * @access public
 */
export async function GET(request: NextRequest) {
    try {
        (await cookies()).delete("jwtToken");
        return NextResponse.json({ message: "user logged out successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}