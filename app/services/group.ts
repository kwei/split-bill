export const getGroupById = async (id: string) => {
  return await fetch("/api/group", {
    method: "POST",
    body: JSON.stringify({
      method: "get",
      data: id,
    }),
  }).then((res) => res.json());
};

export const deleteGroupById = async (id: string) => {
  return await fetch("/api/group", {
    method: "POST",
    body: JSON.stringify({
      method: "delete",
      data: id,
    }),
  }).then((res) => res.json());
};

export const addGroup = async (group: Omit<Group, "group_id">) => {
  return await fetch("/api/group", {
    method: "POST",
    body: JSON.stringify({
      method: "set",
      data: JSON.stringify(group),
    }),
  }).then((res) => res.json());
};

export const updateGroupName = async (groupId: number, name: string) => {
  return await fetch("/api/group", {
    method: "POST",
    body: JSON.stringify({
      method: "update-name",
      data: JSON.stringify({
        groupId,
        name,
      }),
    }),
  }).then((res) => res.json());
};

export const updateGroupMembers = async (
  groupId: number,
  members: string[],
) => {
  return await fetch("/api/group", {
    method: "POST",
    body: JSON.stringify({
      method: "update-members",
      data: JSON.stringify({
        groupId,
        members,
      }),
    }),
  }).then((res) => res.json());
};
