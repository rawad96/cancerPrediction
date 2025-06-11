import { useEffect, useState } from "react";
import "./navbar.css";
import { accessurl } from "../../constants/APIs";
import axios from "axios";

const Navbar = ({ getView }) => {
  const [View, setView] = useState("all");

  useEffect(() => {
    getView("all");
  }, []);
  return (
    <>
      <nav className="main_navbar">
        <ul>
          <li
            className={
              View === "all" ? "main_navbar_active first_li" : "first_li"
            }
            onClick={() => {
              getView("all");
              setView("all");
            }}
          >
            All Patients
          </li>
          <li
            className={View === "add" ? "main_navbar_active" : ""}
            onClick={() => {
              getView("add");
              setView("add");
            }}
          >
            Add New Patient
          </li>
          <li
            className={View === "new" ? "main_navbar_active" : ""}
            onClick={() => {
              getView("new");
              setView("new");
            }}
          >
            New Prediction
          </li>
          <li
            className={
              View === "history" ? "main_navbar_active last_li" : "last_li"
            }
            onClick={() => {
              getView("history");
              setView("history");
            }}
          >
            Prediction History
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
