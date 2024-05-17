import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Shop Item",
  description: "Shop Item created with 🏗 Scaffold-ETH 2",
});

const ShopItemLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ShopItemLayout;
