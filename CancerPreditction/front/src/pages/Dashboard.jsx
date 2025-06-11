import "../css/dashboard.css";
import Navbar from "../components/Navbar/Navbar";
import MainView from "../components/MainView/MainView";
import { useState } from "react";
import MainNavbar from "../components/Navbar/MainNavbar";

const Dashboard = () => {
  const [selected, setselected] = useState("add");

  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="dashboard">
          <Navbar getView={(e) => setselected(e)} />
          <MainView activeView={selected} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
