import { Outlet } from "react-router";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
