import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/profile.css";
import { FaUserDoctor } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ProfileMenu = ({ getView }) => {
  const [View, setView] = useState("personal");
  const navigate = useNavigate();

  useEffect(() => {
    getView("personal");
  }, []);
  return (
    <>
      <nav className="Profilemenu">
        <div
          style={{
            borderBottom: " 1px solid rgb(228, 228, 228)",
            paddingTop: "2%",
            paddingBottom: "2%",
          }}
        >
          <div className="profileImg">
            <FaUserDoctor size={100} />
          </div>
          <p
            onClick={() => {
              getView("edit");
              setView("edit");
            }}
          >
            Edit Profile
            <FiEdit size={15} />
          </p>
        </div>
        <ul>
          <li
            className={View === "personal" ? "Profilemenu_active" : ""}
            onClick={() => {
              getView("personal");
              setView("personal");
            }}
          >
            Personal Information
          </li>
          <li
            className={View === "help" ? "Profilemenu_active" : ""}
            onClick={() => {
              getView("help");
              setView("help");
            }}
          >
            Help
          </li>
          <li
            className={View === "dashboard" ? "Profilemenu_active" : ""}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ProfileMenu;
