import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const arr = [
  "hello anon, welcome to krk.finance;",
  "a solana-focused dev guild.",
  // "we teach n00bs how-to from 0 to 100 !",
  "we participate hackathons,",
  "we contribute to open-source,",
  "and the web3 job market.",
  // "cat /etc/passwd",
  // "^(\\w+\\s){23}\\w+$",
  // "^(\\w+\\s){11}\\w+$",
  // "^[a-zA-Z0-9_]{88}$",
  // "^\\[([0-9]+,){63}[0-9]+\\]$",
  // "^[a-z0-9_]{32}$",
  // "^[a-z0-9_]{64}$",
  "we're attending buildspace S3",
];

export default function TypedTitle() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: arr,
      startDelay: 500,
      typeSpeed: 42,
      backSpeed: 42,
      backDelay: 1111,
      loop: false,
      smartBackspace: false,
    });

    // Destroying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="w-screen lg:w-[420px] mx-auto mockup-code bg-black border-2 border-white overflow-hidden">
      <pre data-prefix=">_" className="ml-3">
        <code className="">
          {" "}
          <span
            ref={el}
            className="text-transparent bg-clip-text bg-gradient-to-tr from-[#14F195] to-[#9945FF]"
          />{" "}
        </code>
      </pre>
    </div>
  );
}
