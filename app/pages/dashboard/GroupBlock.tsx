"use client";

import { useUserContext } from "@/app/context/AccountProvider";
import { deleteGroupById } from "@/app/services/group";
import Image from "next/image";
import shareIcon from "@/public/assets/icons/share-fill.svg";
import goToIcon from "@/public/assets/icons/box-arrow-up-right.svg";
import deleteIcon from "@/public/assets/icons/trash-fill.svg";
import checkIcon from "@/public/assets/icons/check-lg.svg";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface Props {
  data: Group;
  key: string;
}

export const GroupBlock = ({ data }: Props) => {
  const { deleteGroup } = useUserContext();
  const router = useRouter();
  const [coping, setCoping] = useState(false);

  const handleGo2GroupDetailPage = useCallback(() => {
    router.push("/pages/group/" + data.uid);
  }, [data.uid]);

  const handleDeleteGroup = useCallback(() => {
    if (confirm("確定要刪除此群組嗎？")) {
      deleteGroupById(data.uid).then(() => {
        deleteGroup(data.uid);
      });
    }
  }, [data.uid]);

  const handleCopyInviteLink = useCallback(async () => {
    if (coping) return;
    setCoping(true);
    await navigator.clipboard.writeText(data.link);
    setTimeout(() => {
      setCoping(false);
    }, 3000);
  }, [data.link, coping]);

  return (
    <div className="relative group border border-solid border-gray-500 p-4 rounded-md size-40 flex items-center justify-center transition-colors hover:bg-gray-500/30">
      <span className="text-lg font-bold">{data.name}</span>
      <div className="absolute bottom-1 left-1 flex flex-wrap gap-1">
        {data.members.map((member) => (
          <Image
            key={member.email}
            src={member.image}
            alt={member.name}
            title={member.name}
            className="rounded-full size-5"
            width={20}
            height={20}
            priority
          />
        ))}
      </div>
      <div className="absolute top-1 right-1 flex flex-col items-center gap-1">
        <button
          className="invisible group-hover:visible rounded-full flex items-center justify-center size-6 transition-colors hover:bg-gray-500"
          title="前往群組"
          onClick={handleGo2GroupDetailPage}
        >
          <Image
            src={goToIcon}
            alt="前往"
            className="size-3"
            width={12}
            height={12}
            priority
          />
        </button>
        <button
          className="invisible group-hover:visible rounded-full flex items-center justify-center size-6 transition-colors hover:bg-gray-500"
          title="複製邀請連結"
          onClick={handleCopyInviteLink}
        >
          {coping ? (
            <Image
              src={checkIcon}
              alt="已複製"
              className="size-3"
              width={12}
              height={12}
              priority
            />
          ) : (
            <Image
              src={shareIcon}
              alt="邀請"
              className="size-3"
              width={12}
              height={12}
              priority
            />
          )}
        </button>
        <button
          className="invisible group-hover:visible rounded-full flex items-center justify-center size-6 transition-colors hover:bg-gray-500"
          title="刪除群組"
          onClick={handleDeleteGroup}
        >
          <Image
            src={deleteIcon}
            alt="刪除"
            className="size-3"
            width={12}
            height={12}
            priority
          />
        </button>
      </div>
    </div>
  );
};
