import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const method = body.method;

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
  } else if (method === "create") {
    const res = await createGroupListTable();
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "delete") {
    const res = await deleteGroup(body.data);
    return NextResponse.json({ status: !!res, data: res });
  }
  return NextResponse.json({ status: false });
}

const createGroupListTable = async () => {
  return await sql`CREATE TABLE IF NOT EXISTS groups (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    members TEXT,
    link TEXT
	);`;
};

const addGroup = async ({
  name,
  link,
  members,
}: {
  name: string;
  members: string[];
  link: string;
}) => {
  return await sql`INSERT INTO groups (name, members, link) 
    VALUES (
      '${name}', 
      '${members.join(",")}', 
      '${link}'
    );`;
};

const updateGroupMembers = async ({
  groupId,
  members,
}: {
  groupId: number;
  members: string[];
}) => {
  return await sql`UPDATE groups 
    SET members = '${members.join(",")}'
    WHERE group_id = ${groupId};`;
};

const updateGroupName = async ({
  groupId,
  name,
}: {
  groupId: number;
  name: string;
}) => {
  return await sql`UPDATE groups 
    SET name = '${name}'
    WHERE group_id = ${groupId};`;
};

const deleteGroup = async (groupId: number) => {
  return await sql`DELETE FROM groups WHERE group_id = ${groupId};`;
};

const getGroup = async (groupId: number) => {
  return await sql`SELECT * FROM groups WHERE group_id = ${groupId};`;
};
