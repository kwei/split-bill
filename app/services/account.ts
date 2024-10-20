export const searchUser = async (email: string) => {
  return await fetch("/api/account", {
    method: "POST",
    body: JSON.stringify({
      method: "get",
      data: email,
    }),
  }).then((res) => res.json());
};

export const addUser = async (user: User) => {
  return fetch("/api/account", {
    method: "POST",
    body: JSON.stringify({
      method: "set",
      data: JSON.stringify(user),
    }),
  }).then((res) => res.json());
};

export const updateUserGroups = async (email: string, groups: string) => {
  return fetch("/api/account", {
    method: "POST",
    body: JSON.stringify({
      method: "update",
      data: JSON.stringify({
        email,
        groups,
      }),
    }),
  }).then((res) => res.json());
};

export const deleteUser = async (email: string) => {
  return fetch("/api/account", {
    method: "POST",
    body: JSON.stringify({
      method: "delete",
      data: email,
    }),
  }).then((res) => res.json());
};
