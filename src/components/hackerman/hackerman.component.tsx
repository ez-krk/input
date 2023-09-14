import Image from "next/image";
import type { FC } from "react";

import hackerman from "../../assets/img/hackerman.gif";

const Hackerman: FC = () => (
  <Image src={hackerman} width={24} height={24} alt="hackerman" />
);

export default Hackerman;
