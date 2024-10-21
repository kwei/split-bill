"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Account = () => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: window.location.href,
      redirect: true,
    }).then();
  };

  const handleSignOut = () => {
    signOut().then();
  };

  if (status === "loading") {
    return <div className="w-full flex flex-col items-center">載入中...</div>;
  } else if (session) {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <div className="rounded-2xl border border-solid border-gray-500 p-8 flex flex-col gap-4 w-full max-w-md">
          <div className="w-full flex flex-col gap-2 items-center">
            <Image
              className="rounded-full size-16"
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
              width={64}
              height={64}
              priority
            />
            <span className="flex-1 text-lg font-semibold text-center">
              {session.user?.name}
            </span>
          </div>
          <Link
            href="/pages/dashboard/"
            className="btn-large w-full text-center"
          >
            前往分帳列表
          </Link>
          <button className="text-gray-500" onClick={handleSignOut}>
            切換帳號
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-lg">使用此系統前請先登入</h2>
        <button className="btn font-semibold" onClick={handleSignIn}>
          使用 Google 帳號登入
        </button>
      </div>
    );
  }
};
