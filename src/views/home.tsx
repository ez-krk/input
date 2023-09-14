// react
import { useState } from "react";
// types
import type { FC } from "react";

import localFont from "next/font/local";
const marker = localFont({ src: "../assets/fonts/adrip1.ttf" });
const pixel = localFont({ src: "../assets/fonts/pixel.ttf" });

export const HomeView: FC = () => {
  // const [loading, setLoading] = useState(true);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <h1 className="leading-relaxed text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] tracking-widest">
        <span className={marker.className}>input</span>
      </h1>
      <div className="text-lg text-white mb-3 leading-relaxed z-[750] ">
        <span className="mx-2 font-bold text-xl">
          <span className={pixel.className}>
            whitelist & fundraising management platform.
          </span>
        </span>
      </div>
    </div>
  );
};
