import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Frame() {
    return (
    <div className="Frame">
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}