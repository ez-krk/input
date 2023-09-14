import { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const ContentContainer: FC<PropsWithChildren> = (props) => {
  const router = useRouter();
  return (
    <div className="drawer w-full">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{props.children}</div>
    </div>
  );
};
