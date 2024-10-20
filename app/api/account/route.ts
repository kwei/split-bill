import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const method = body.method;

  await createUserTable();

  if (method === "get") {
    const res = await searchUser(body.data);
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "set") {
    const res = await addUser(JSON.parse(body.data));
    return NextResponse.json({ status: !!res, data: res });
  }
  return NextResponse.json({ status: false });
}

// group_ids 用逗號分隔
const createUserTable = async () => {
  await sql`CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profile_picture TEXT,
    group_ids TEXT
  );`;
};

const searchUser = async (email: string) => {
  const { rows } = await sql`SELECT * FROM users WHERE email = ${email};`;
  if (rows[0]) {
    return {
      name: rows[0].name,
      email: rows[0].email,
      image: rows[0].image,
      groups: rows[0].groups,
    } as User;
  }
  return null;
};

const addUser = async (user: User) => {
  const name = user.name;
  const email = user.email;
  const image = user.image;
  const groups = user.groups;
  return await sql`INSERT INTO users (name, email, profile_picture, group_ids) 
    VALUES (${name}, ${email}, ${image}, ${groups});`;
};
