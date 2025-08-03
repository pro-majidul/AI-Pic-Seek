import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import Marquee from "react-fast-marquee";

const AppLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && user?.email && (
        <Marquee
          pauseOnHover={true}
          gradient={true}
          className="bg-primary text-base-100"
        >
          Welcome Mr. {user?.displayName} 🐦‍🔥. Lets unleash the power of
          PicSeek-AI
        </Marquee>
      )}
      <header className="bg-gradient-to-t lg:bg-gradient-to-l from-cyan-100 ">
        <nav className="md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </nav>
      </header>

      <main className="min-h-[calc(100svh-125px)]">
        <Outlet></Outlet>
      </main>

      <footer className="footer footer-center bg-cyan-50 glass text-base-content p-4">
        <aside>
          <p className="text-gray-800">
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default AppLayout;
