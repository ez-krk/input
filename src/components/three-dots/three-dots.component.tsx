import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function ThreeDots() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["..."],
      startDelay: 0,
      typeSpeed: 111,
      backSpeed: 111,
      backDelay: 111,
      loop: true,
      smartBackspace: false,
      showCursor: false,
    });

    // Destroying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div
      ref={el}
      // className="text-transparent bg-clip-text bg-gradient-to-tr from-[#14F195] to-[#9945FF] code-font absolute mt-8"
      className="text-warning code-font absolute mt-8"
    />
  );
}
