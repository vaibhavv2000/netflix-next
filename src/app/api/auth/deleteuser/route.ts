import pg from "@/lib/pg";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function DELETE() {
 const user = cookies().get("netflix-user") as any;
 
 try {
  await pg.query(`DELETE FROM users WHERE email = $1`, [user?.value?.email]);
  cookies().delete("netflix-user");
  return NextResponse.json({message: "User deleted"},{status: 200});
 } catch (error) {
  return NextResponse.json(error, {status: 500});
 }
};