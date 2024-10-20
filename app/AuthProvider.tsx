"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

const INIT_USER = {
  email: "",
  groups: "",
  image: "",
  name: "",
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(INIT_USER);
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
  return (
    <SessionProvider>
      <Ctx.Provider value={contextValue}>{children}</Ctx.Provider>
    </SessionProvider>
  );
};

export default AuthProvider;

const Ctx = createContext<{
  user: User;
  setUser: (_user: User) => void;
}>({
  user: INIT_USER,
  setUser: (_user: User) => {},
});

export const useUserContext = () => useContext(Ctx);
