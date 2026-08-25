import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children, hideFooter = false }) => {
  const { pathname } = useLocation();
  const isChat = pathname.startsWith("/chat");
  const showFooter = !hideFooter && !isChat;

  return (
    <>
      <Navbar />
      <main className={`min-w-0 overflow-x-clip ${isChat ? "pb-0" : ""}`}>
        {children}
      </main>
      {showFooter ? <Footer /> : null}
    </>
  );
};

export default MainLayout;
