"use client";

import { deleteGroupById } from "@/app/services/group";

interface Props {
  data: Group;
  key: string;
}

export const GroupBlock = ({ data }: Props) => {
  const onClick = () => {
    deleteGroupById(data.uid).then();
  };

  return <button onClick={onClick}>{data.name}</button>;
};
