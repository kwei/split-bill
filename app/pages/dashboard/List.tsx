"use client";

import { useUserContext } from "@/app/context/AccountProvider";
import { GroupBlock } from "@/app/pages/dashboard/GroupBlock";
import { addGroup, getGroupById } from "@/app/services/group";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const List = () => {
  const { user, updateUser } = useUserContext();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOpenDialog = async () => {
    const groupName = prompt("請輸入欲創建之群組名稱");
    if (groupName && groupName !== "") {
      await handleAddGroup(groupName);
    }
  };

  const handleAddGroup = useCallback(
    async (groupName: string) => {
      if (!groupName || groupName === "") return;
      const groupId = uuidv4();
      const groupInfo: Group = {
        uid: groupId,
        members: [user],
        name: groupName,
        link: `${window.location.origin}/invite/${groupId}`,
      };
      addGroup(groupInfo).then((res) => {
        if (res.status) {
          if (user.groups === "") {
            updateUser(groupId);
          } else {
            const existedGroups = new Set(user.groups.split(","));
            if (existedGroups.has(groupId)) return;
            const newGroups = [...Array.from(existedGroups), groupId].join(",");
            updateUser(newGroups);
          }
        }
      });
    },
    [user.email, user.groups],
  );

  const getGroupInfo = async (groupIds: string[]) => {
    setLoading(true);
    const result: Group[] = [];
    for (const groupId of groupIds) {
      if (groupId !== "") {
        const data = await getGroupById(groupId).then((res) => {
          if (!res.status) return;
          return {
            ...res.data,
            members: JSON.parse(res.data.members),
          } as Group;
        });
        if (data) result.push(data);
      }
    }
    setGroups(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user.groups !== "") {
      const groupIds = user.groups.split(",");
      getGroupInfo(groupIds).then();
    } else {
      setGroups([]);
    }
  }, [user.groups]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">載入中...</div>
    );
  }

  return (
    <div className="w-full flex flex-wrap gap-4 justify-center">
      {groups.map((group) => (
        <GroupBlock key={group.uid} data={group} />
      ))}
      <button
        className="border border-dashed border-gray-500 rounded-md size-40 text-center align-middle transition-colors text-gray-500 hover:text-gray-300 hover:bg-gray-500/30 active:text-white active:bg-gray-500/50"
        type="button"
        onClick={handleOpenDialog}
      >
        建立新群組
      </button>
    </div>
  );
};
