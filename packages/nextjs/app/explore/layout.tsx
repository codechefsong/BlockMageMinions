import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Explore",
  description: "Explore created with 🏗 Scaffold-ETH 2",
});

const ExploreLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ExploreLayout;
