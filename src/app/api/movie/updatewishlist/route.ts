import pg from "@/lib/pg";
import {getUser} from "@/utils/JWT";
import type {user} from "@/utils/types";
import {type NextRequest, NextResponse} from "next/server";

export async function PATCH({nextUrl}: NextRequest) {
 const {id} = getUser() as user;

 if(!id) return NextResponse.json({message: "Unauthorized"}, {status: 401});

 const movieId = nextUrl.searchParams.get("id");
 const add = nextUrl.searchParams.get("add");

 if(!movieId) return NextResponse.json({message: "All fields are required"}, {status: 400});

 let query = "";

 if(add) query = `UPDATE users SET wishlist = array_append(wishlist, $1) WHERE id = $2`;
 else query = `UPDATE users SET wishlist = array_remove(wishlist, $1) WHERE id = $2`;

 try {
  await pg.query(query, [movieId, id]);
  return NextResponse.json({success: true},{status: 201});
 } catch(error) {
  return NextResponse.json(error,{status:500});
 };
};