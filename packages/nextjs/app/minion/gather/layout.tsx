import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Gather Materials",
  description: "Gather Materials created with 🏗 Scaffold-ETH 2",
});

const GatherMaterialLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GatherMaterialLayout;
