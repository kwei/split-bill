"use client";

import { useUserContext } from "@/app/AccountProvider";
import { GroupBlock } from "@/app/pages/dashboard/GroupBlock";
import { updateUserGroups } from "@/app/services/account";
import { addGroup, getGroupById } from "@/app/services/group";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const List = () => {
  const { user, setUser } = useUserContext();
  const [groups, setGroups] = useState<Group[]>([]);

  const handleAddGroup = async () => {
    const groupId = uuidv4();
    const groupInfo: Group = {
      uid: groupId,
      members: [user.email],
      name: groupId,
      link: `${window.location.origin}/invite/${groupId}`,
    };
    addGroup(groupInfo).then((res) => {
      if (res.status) {
        setGroups((prevState) => {
          const newState = new Set([...prevState]);
          newState.add(groupInfo);
          return Array.from(newState);
        });
      }
    });
  };

  useEffect(() => {
    if (user.groups.split(",").length > 0) {
      const groupIds = user.groups.split(",");
      const result: Group[] = [];
      if (groupIds[0] !== "") {
        groupIds.forEach((groupId) => {
          getGroupById(groupId).then((res) => {
            result.push(res as Group);
          });
        });
        setGroups(result);
      }
    }
  }, [user.groups]);

  useEffect(() => {
    if (groups.length > 0) {
      const newGroups = groups.map((v) => v.uid).join(",");
      if (newGroups !== "" && newGroups !== user.groups) {
        updateUserGroups(user.email, newGroups).then(() => {
          setUser({
            ...user,
            groups: newGroups,
          });
        });
      }
    }
  }, [groups, user]);

  return (
    <div className="w-full flex flex-wrap gap-4 justify-center">
      {groups.map((group) => (
        <GroupBlock key={group.uid} data={group} />
      ))}
      <button className="btn-large" type="button" onClick={handleAddGroup}>
        Add
      </button>
    </div>
  );
};
