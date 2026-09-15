import { useState } from "react";
import Layout from "../../components/Layout";
import CustomerHome from "./CustomerHome";
import CustomerMenu from "./CustomerMenu";
import CustomOrder from "./CustomOrder";
import MyOrders from "./MyOrders";
import CustomerNotifications from "./CustomerNotifications";
import CustomerProfile from "./CustomerProfile";
import type { SharedRequest } from "../../App";

interface Props {
  userName: string;
  onLogout: () => void;
  customRequests: SharedRequest[];
  onUpdateRequests: (reqs: SharedRequest[]) => void;
}

export default function CustomerApp({ userName, onLogout, customRequests, onUpdateRequests }: Props) {
  const [page, setPage] = useState("home");

  const pages: Record<string, React.ReactNode> = {
    home: <CustomerHome userName={userName} onNavigate={setPage} />,
    menu: <CustomerMenu />,
    "custom-order": <CustomOrder customRequests={customRequests} onUpdateRequests={onUpdateRequests} />,
    "my-orders": <MyOrders />,
    notifications: <CustomerNotifications />,
    profile: <CustomerProfile userName={userName} />,
  };

  const pendingPrice = customRequests.filter(r => r.status === "awaiting_client").length;

  return (
    <Layout role="customer" userName={userName} activePage={page} onNavigate={setPage} onLogout={onLogout} notifications={3 + pendingPrice}>
      {pages[page] ?? pages["home"]}
    </Layout>
  );
}
