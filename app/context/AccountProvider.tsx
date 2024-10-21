"use client";

import { addUser, searchUser, updateUserGroups } from "@/app/services/account";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const INIT_USER = {
  email: "",
  groups: "",
  image: "",
  name: "",
};

const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(INIT_USER);
  const { data: session } = useSession();

  const refreshUser = (email: string) => {
    searchUser(email).then((res) => {
      if (res.status) {
        setUser(res.data);
      }
    });
  };

  const handleUpdateUserGroups = useCallback(
    async (groups: string) => {
      if (user.email === "") return;
      await updateUserGroups(user.email, groups);
      refreshUser(user.email);
    },
    [user.email],
  );

  const handleDeleteUserGroup = useCallback(
    async (groupId: string) => {
      const existedGroups = new Set(user.groups.split(","));
      if (existedGroups.has(groupId)) {
        existedGroups.delete(groupId);
        const newGroups = Array.from(existedGroups).join(",");
        await updateUserGroups(user.email, newGroups);
        refreshUser(user.email);
      }
    },
    [user.email, user.groups],
  );

  const contextValue = useMemo(
    () => ({
      user,
      updateUser: handleUpdateUserGroups,
      deleteGroup: handleDeleteUserGroup,
    }),
    [user, handleDeleteUserGroup, handleUpdateUserGroups],
  );

  useEffect(() => {
    if (session?.user?.email) {
      const newUser = {
        email: session.user.email,
        groups: "",
        image: session.user.image ?? "",
        name: session.user.name ?? "",
      };
      searchUser(session.user.email).then((res) => {
        if (res.status) {
          setUser(res.data);
        } else {
          addUser(newUser).then();
          setUser(newUser);
        }
      });
    }
  }, [session]);

  return <Ctx.Provider value={contextValue}>{children}</Ctx.Provider>;
};

export default AccountProvider;

const Ctx = createContext<{
  user: User;
  updateUser: (_groups: string) => void;
  deleteGroup: (_groupId: string) => void;
}>({
  user: INIT_USER,
  updateUser: (_groups: string) => {},
  deleteGroup: (_groupId: string) => {},
});

export const useUserContext = () => useContext(Ctx);
