import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const method = body.method;

  await createGroupListTable();

  if (method === "get") {
    const res = await getGroup(body.data);
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "set") {
    const res = await addGroup(JSON.parse(body.data));
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "update-name") {
    const res = await updateGroupName(JSON.parse(body.data));
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "update-members") {
    const res = await updateGroupMembers(JSON.parse(body.data));
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "delete") {
    const res = await deleteGroup(body.data);
    return NextResponse.json({ status: !!res, data: res });
  }
  return NextResponse.json({ status: false });
}

const createGroupListTable = async () => {
  // await sql`DROP TABLE IF EXISTS groups;`;
  return await sql`CREATE TABLE IF NOT EXISTS groups (
    group_id SERIAL PRIMARY KEY,
    uid TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    members JSON,
    link TEXT NOT NULL
	);`;
};

const addGroup = async ({
  name,
  link,
  members,
  uid,
}: {
  name: string;
  members: string[];
  link: string;
  uid: string;
}) => {
  return await sql`INSERT INTO groups (uid, name, members, link) 
    VALUES (
      ${uid},
      ${name}, 
      ${JSON.stringify(members)}, 
      ${link}
    );`;
};

const updateGroupMembers = async ({
  uid,
  members,
}: {
  uid: string;
  members: string[];
}) => {
  return await sql`UPDATE groups 
    SET members = ${JSON.stringify(members)}
    WHERE uid = ${uid};`;
};

const updateGroupName = async ({
  uid,
  name,
}: {
  uid: string;
  name: string;
}) => {
  return await sql`UPDATE groups 
    SET name = ${name}
    WHERE uid = ${uid};`;
};

const deleteGroup = async (uid: string) => {
  return await sql`DELETE FROM groups WHERE uid = ${uid};`;
};

const getGroup = async (uid: string) => {
  const { rows } = await sql`SELECT * FROM groups WHERE uid = ${uid};`;
  return rows[0];
};
