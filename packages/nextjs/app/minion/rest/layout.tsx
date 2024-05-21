import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Rest Minion",
  description: "Rest Minion created with 🏗 Scaffold-ETH 2",
});

const RestMinionLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RestMinionLayout;
