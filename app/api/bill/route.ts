import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const method = body.method;

  if (method === "get") {
    const res = await getAllBills(body.data);
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "create") {
    const res = await createGroupTable(body.data);
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "set") {
    const res = await addBill(JSON.parse(body.data));
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "delete") {
    const res = await deleteBill(JSON.parse(body.data));
    return NextResponse.json({ status: !!res, data: res });
  } else if (method === "leave") {
    const res = await deleteGroupTable(body.data);
    return NextResponse.json({ status: !!res, data: res });
  }
  return NextResponse.json({ status: false });
}

// sharers: JSON.stringify([{"email": "example@mail.com", "amount": 50.00}])
const createGroupTable = async (groupId: number) => {
  return await sql`CREATE TABLE IF NOT EXISTS group_ledger_<${groupId}> (
    entry_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    payer JSON NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    sharers JSON
  );`;
};

const getAllBills = async (groupId: number) => {
  const { rows } = await sql`SELECT * FROM group_ledger_<${groupId}>;`;
  return rows;
};

const deleteGroupTable = async (groupId: number) => {
  return await sql`DROP TABLE IF EXISTS group_ledger_<${groupId}>;`;
};

const addBill = async ({ groupId, bill }: { groupId: number; bill: Bill }) => {
  return await sql`INSERT INTO group_ledger_<${groupId}> (date, payer, total_amount, description, sharers) 
		VALUES (
			${bill.date}, 
			${JSON.stringify(bill.payer)}, 
			${bill.totalAmount}, 
			${bill.description}, 
			${JSON.stringify(bill.sharers)}
		);`;
};

const deleteBill = async ({
  groupId,
  billId,
}: {
  groupId: number;
  billId: number;
}) => {
  return await sql`DELETE FROM group_ledger_<${groupId}> WHERE entry_id = ${billId};`;
};
