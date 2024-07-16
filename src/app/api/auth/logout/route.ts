import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function DELETE() {
 cookies().delete("netflix-user");
 return NextResponse.json("Logged out",{status: 200});
};