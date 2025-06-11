import { useState } from "react";
import Navbar from "../components/AdminPageComponents/Navbar";
import MainViewAdminPage from "../components/AdminPageComponents/MainViewAdminPage";

const AdminPage = () => {
  const [selected, setselected] = useState("add");
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar getView={(e) => setselected(e)} />
        <MainViewAdminPage activeView={selected} />
      </div>
    </>
  );
};

export default AdminPage;
