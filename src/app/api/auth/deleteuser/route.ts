import pg from "@/lib/pg";
import JWT from "@/utils/JWT";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function DELETE() {
 const user = cookies().get("netflix-user");
 const {id} = JWT.decode(user?.value as string) as {id: number};
 
 try {
  await pg.query(`DELETE FROM users WHERE id = $1`, [id]);
  cookies().delete("netflix-user");
  return NextResponse.json({success: true},{status: 200});
 } catch (error) {
  return NextResponse.json(error, {status: 500});
 }
};