import { List } from "@/app/pages/dashboard/List";

export default function Home() {
  return (
    <div className="size-full flex flex-col p-4 md:p-8">
      <h1 className="text-2xl font-bold w-full text-center">分帳系統－列表</h1>

      <div className="w-full">
        <List />
      </div>
    </div>
  );
}
