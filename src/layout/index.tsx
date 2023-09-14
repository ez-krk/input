// React
import { ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import { NavBar } from "../components/navbar/navbar.component";

import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  //   const { publicKey } = useWallet();
  const wallet = useWallet();
  const router = useRouter();

  return (
    <div className="w-screen">
      <NavBar wallet={wallet} router={router} />
      {/* <div className="w-full h-[40px] bg-gradient-to-r from-[#14F195] to-[#9945FF] z-[999] fixed top-0 flex justify-center items-center">
        <div className="marquee">
          <p className="font-bold text-lg overflow-x-hidden text-center">
            wl mint is live, public on 16/09 at 4:20pm UTC 👉{" "}
            <Link
              href="https://discord.gg/jpWc7A6dcf"
              className="text-success underline cursor-pointer hover:text-white"
            >
              get wl
            </Link>
          </p>
        </div>
      </div> */}
      <div className="min-h-screen flex justify-center w-screen items-center flex-col bg-black text-white lowercase overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;
