import { useState } from "react";
import "./AdminComponents.css";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { supportsUrl } from "../../constants/APIs";
import SpinnerLoading from "../LoadingComponents/SpinnerLoading";

const EditSupport = ({ support, updated, close }) => {
  const [formData, setformData] = useState({ ...support });
  const [isLoading, setisLoading] = useState(false);

  const handleSave = async () => {
    setisLoading(true);
    try {
      const response = await axios.put(
        `${supportsUrl}/${support._id}`,
        formData
      );

      if (!response) {
        throw new Error("Somthing went wrong!");
      }
      setisLoading(false);
      alert("Data updated successfully");
      updated(formData);
    } catch (error) {
      setisLoading(false);
      alert("Somthing went wrong!: " + error.message);
    }
  };

  return (
    <>
      <div className="saveStatusDiv">
        <div style={{ textAlign: "right", paddingBottom: "1%" }}>
          <IoMdClose
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => close()}
          />
        </div>
        <h2>Save Status</h2>
        <div>Are you sure you want to change this status?</div>
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <button
            onClick={handleSave}
            style={{ margin: "1px" }}
            className="saveButton"
          >
            Save
          </button>
        </div>
      </div>
      {isLoading && <SpinnerLoading />}
    </>
  );
};

export default EditSupport;
