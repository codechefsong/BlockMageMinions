import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Train Minion",
  description: "Train Minion created with 🏗 Scaffold-ETH 2",
});

const TrainMinionLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default TrainMinionLayout;
