import SideBar from "../../Components/Dashboard/Sidebar";
import TopBar from "../../Components/Dashboard/TopBar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";

import { useNavigate } from "react-router-dom";
import { Axios } from "../../Api/axios";
export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <div className="position-relative ">
      <TopBar />
      <div className="dashboard d-flex gap-1" style={{ marginTop: "70px" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
