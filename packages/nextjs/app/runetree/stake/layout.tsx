import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Stake for Rune Tree",
  description: "Stake for Rune Tree created with 🏗 Scaffold-ETH 2",
});

const StakeRuneTreeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default StakeRuneTreeLayout;
