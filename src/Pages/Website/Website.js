import NavBar from "../../Components/WebSite/NavBar/NavBar";
import { Outlet } from "react-router-dom";
export default function Website() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
