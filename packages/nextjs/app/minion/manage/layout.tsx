import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Manage Minion",
  description: "Manage Minion created with 🏗 Scaffold-ETH 2",
});

const ManageMinionLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ManageMinionLayout;
