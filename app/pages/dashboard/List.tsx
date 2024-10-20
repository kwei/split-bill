"use client";

import { useUserContext } from "@/app/AuthProvider";
import { GroupBlock } from "@/app/pages/dashboard/GroupBlock";
import { Fragment, useState } from "react";

export const List = () => {
  const { user, setUser } = useUserContext();
  const [groups, setGroups] = useState<Group[]>([]);

  const handleAddGroup = () => {
    // addGroup("test", [], "").then();
  };

  // useEffect(() => {
  //   if (user.groups.split(",").length > 0) {
  //     const groupIds = user.groups.split(",").map((v) => Number(v));
  //     const result: Group[] = [];
  //     groupIds.forEach((groupId) => {
  //       getGroup(groupId).then((res) => {
  //         result.push(res as Group);
  //       });
  //     });
  //     setGroups(result);
  //   }
  // }, [user.groups]);
  //
  // useEffect(() => {
  //   if (groups.length > 0) {
  //     const newGroups = groups.map((v) => v.id).join(",");
  //     if (newGroups !== user.groups) {
  //       setUser({
  //         ...user,
  //         groups: newGroups,
  //       });
  //     }
  //   }
  // }, [groups, user]);

  return (
    <div className="w-full flex flex-wrap gap-4 justify-center">
      {groups.map((group) => (
        <Fragment key={group.id}>
          <GroupBlock data={group} />
        </Fragment>
      ))}
      <button className="btn-large" type="button" onClick={handleAddGroup}>
        Add
      </button>
    </div>
  );
};
