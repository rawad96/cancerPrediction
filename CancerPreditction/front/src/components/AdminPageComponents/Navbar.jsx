import { useEffect, useState } from "react";
import "./AdminComponents.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ getView }) => {
  const [View, setView] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    getView("all");
  }, []);
  return (
    <>
      <nav className="AdminMainNavbar">
        <ul>
          <li
            className={View === "all" ? "main_navbar_active" : ""}
            onClick={() => {
              getView("all");
              setView("all");
            }}
          >
            All Users
          </li>
          <li
            className={View === "add" ? "main_navbar_active" : ""}
            onClick={() => {
              getView("add");
              setView("add");
            }}
          >
            Add New User
          </li>
          <li
            className={View === "supports" ? "main_navbar_active" : ""}
            onClick={() => {
              getView("supports");
              setView("supports");
            }}
          >
            All Supports
          </li>
          <li
            className={View === "dashboard" ? "main_navbar_active" : ""}
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

export default Navbar;
