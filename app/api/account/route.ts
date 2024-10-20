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
  } else if (method === "update") {
    const res = await updateUserGroups(JSON.parse(body.data));
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "delete") {
    const res = await deleteUser(body.data);
    return NextResponse.json({ status: !!res, data: res });
  }
  return NextResponse.json({ status: false });
}

// group_ids 用逗號分隔
const createUserTable = async () => {
  // await sql` DROP TABLE IF EXISTS users;`;
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
      image: rows[0].profile_picture,
      groups: rows[0].group_ids,
    } as User;
  }
  return null;
};

const addUser = async (user: User) => {
  return await sql`INSERT INTO users (name, email, profile_picture, group_ids) 
    VALUES (${user.name}, ${user.email}, ${user.image}, ${user.groups});`;
};

const updateUserGroups = async ({
  email,
  groups,
}: {
  email: string;
  groups: string;
}) => {
  return await sql`UPDATE users 
    SET group_ids = ${groups}
    WHERE email = ${email};`;
};

const deleteUser = async (email: string) => {
  return await sql`DELETE FROM users WHERE email = ${email};`;
};
