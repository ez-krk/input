// react
import React, { FC, useEffect, useState } from "react";

export const Matrix: FC = () => {
  const [canvasUrl, setCanvasUrl] = useState(null);
  const ref = React.useRef(null);
  useEffect(() => {
    // The DOM element is accessible here.
    console.log(ref.current);
    const canvas = ref.current;
    const dataUrl = canvas.toDataURL();
    if (dataUrl) () => setCanvasUrl(dataUrl);
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const str =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrix = str.split("");
    const font = 12;
    const col = width / font;
    const arr: string | any[] = [];

    for (let i = 0; i < col; i++) {
      arr[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#14F195";
      ctx.font = `${font}px system-ui`;
      for (let i = 0; i < arr.length; i++) {
        const txt = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(txt, i * font, arr[i] * font);
        if (arr[i] * font > height && Math.random() > 0.975) {
          arr[i] = 0;
          console.log(typeof arr);
        }
        arr[i]++;
      }
    };
    setInterval(draw, 20);

    window.addEventListener("resize", () => location.reload());
  }, []);

  return (
    <>
      <canvas
        className="absolute top-0 left-0 mt-[67.5px] h-[calc(100vh-67.5px)] w-screen z-[0]"
        ref={ref}
        id="canvas"
      ></canvas>
    </>
  );
};
