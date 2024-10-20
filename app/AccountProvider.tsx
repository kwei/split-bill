"use client";

import { addUser, searchUser } from "@/app/services/account";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
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

  const handleSetUser = (_user: User) => {
    setUser(_user);
  };
  const contextValue = useMemo(
    () => ({
      user,
      setUser: handleSetUser,
    }),
    [user],
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
  setUser: (_user: User) => void;
}>({
  user: INIT_USER,
  setUser: (_user: User) => {},
});

export const useUserContext = () => useContext(Ctx);
