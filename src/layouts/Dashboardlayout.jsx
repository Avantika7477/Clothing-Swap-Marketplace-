import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
