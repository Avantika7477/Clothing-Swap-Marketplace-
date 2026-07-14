import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; // Uncomment if you have one

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
