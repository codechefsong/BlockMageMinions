import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Rune Tree",
  description: "Rune Tree created with 🏗 Scaffold-ETH 2",
});

const RuneTreeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RuneTreeLayout;
