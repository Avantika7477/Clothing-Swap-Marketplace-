import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-w-0 overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
