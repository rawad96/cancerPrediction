import "./navbar.css";
import { FaUserDoctor } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { accessurl } from "../../constants/APIs";
import axios from "axios";

const MainNavbar = () => {
  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    const access = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const resp = await axios.get(accessurl, {
          headers: { xaccesstoken: accessToken },
        });
        if (resp.data.permission.includes("ADMIN")) {
          setAdmin(true);
        }
      }
    };
    access();
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };
  return (
    <>
      <div
        style={{
          alignItems: "center",
          borderBottom: "1px solid black",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "10px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <FaUserDoctor size={25} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Dr. Rawad bader</span>
            <span>{sessionStorage.getItem("time")}</span>
          </div>
        </div>
        <div className="topRightDiv">
          {Admin && (
            <div onClick={() => navigate("/admin")}>
              <RiAdminLine size={25} />
            </div>
          )}
          {!Admin && (
            <div onClick={() => navigate("/profile")}>
              <CgProfile size={25} />
            </div>
          )}
          <div onClick={logout}>
            <AiOutlineLogout size={25} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNavbar;
