import Link from "next/link";

export const GroupBlock = ({ data }: { data: Group }) => {
  return <Link href={`../group/${data.id}/`}>{data.name}</Link>;
};
