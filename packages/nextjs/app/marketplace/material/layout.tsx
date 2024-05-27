import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Shop Material",
  description: "Shop Material created with 🏗 Scaffold-ETH 2",
});

const ShopMaterialLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ShopMaterialLayout;
