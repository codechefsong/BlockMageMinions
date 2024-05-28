import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Battle Thief",
  description: "Battle Thief created with 🏗 Scaffold-ETH 2",
});

const BattleThiefLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BattleThiefLayout;
