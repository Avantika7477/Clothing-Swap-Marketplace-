import MainLayout from "../../layouts/MainLayout";

import DashboardHeader from "./sections/DashboardHeader";
import ProfileCard from "./sections/ProfileCard";
import StatsCards from "./sections/StatsCards";
import QuickActions from "./sections/QuickActions";
import MyListings from "./sections/MyListings";
import RecentSwaps from "./sections/RecentSwaps";

const Dashboard = () => {
  return (
    <MainLayout>
      <section className="min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <DashboardHeader />

          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <ProfileCard />
            </div>

            <div className="lg:col-span-2">
              <StatsCards />

              <QuickActions />

              <MyListings />

              <RecentSwaps />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
