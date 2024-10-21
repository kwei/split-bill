"use client";

import { getGroupById } from "@/app/services/group";
import { useEffect, useState } from "react";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  const [groupInfo, setGroupInfo] = useState<Group>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGroupById(id)
      .then((res) => {
        if (!res.status) return;
        return {
          ...res.data,
          members: JSON.parse(res.data.members),
        } as Group;
      })
      .then((res) => {
        setGroupInfo(res);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="size-full flex flex-col p-4 md:p-8 text-center">
        載入中...
      </div>
    );
  } else if (groupInfo === undefined) {
    return (
      <div className="size-full flex flex-col p-4 md:p-8 text-center">
        ...找不到群組
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col p-4 md:p-8">
      <h1 className="text-2xl font-bold w-full text-center">
        分帳群組－{groupInfo.name}
      </h1>

      <div className="w-full"></div>
    </div>
  );
}
