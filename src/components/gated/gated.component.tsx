// React
import { FC, ReactNode, useContext } from "react";
import { HolderEnum } from "../../constants";
import { NotHolder } from "../not-holder/not-holder.component";
import { HolderContext } from "../../contexts/holder.context";
import Layout from "../../layout";

const Gated: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { holder } = useContext(HolderContext);
  return (
    <Layout>{holder === HolderEnum.Yay ? children : <NotHolder />}</Layout>
  );
};

export default Gated;
