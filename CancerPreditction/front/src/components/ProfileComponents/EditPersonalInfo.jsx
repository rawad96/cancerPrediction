import { useState } from "react";
import { personalInfoKeysOrder } from "../../constants/States";
import axios from "axios";
import { usersUrl } from "../../constants/APIs";
import SpinnerLoading from "../LoadingComponents/SpinnerLoading";

const EditPersonalInfo = ({ userData }) => {
  const [formData, setformData] = useState({ ...userData });
  const [iseLoading, setiseLoading] = useState(false);

  const formatHeader = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  };

  const formatDateForInput = (val) => {
    const d = new Date(val);
    if (isNaN(d)) return "";
    return d.toISOString().split("T")[0];
  };

  const formatDateForPlaceholder = (val) => {
    const d = new Date(val);
    if (isNaN(d)) return "";
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const handleChange = (key, value) => {
    setformData((prev) => ({ ...prev, [key]: value }));
  };

  const isDataChanged = () => {
    return Object.entries(formData).some(
      ([key, value]) => value !== userData[key]
    );
  };

  const handleSave = async () => {
    if (!isDataChanged()) {
      alert("Nothing to update!");
      return;
    }
    setiseLoading(true);
    try {
      const response = await axios.put(`${usersUrl}/${userData._id}`, {
        formData,
      });

      if (!response) {
        throw new Error("Somthing went wrong!");
      }
      setTimeout(() => {
        setiseLoading(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      setiseLoading(false);
      alert("Somthing went wrong!: " + error.message);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
        <div style={{ display: "flex", gap: "2%" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {personalInfoKeysOrder?.map((field, index) => {
              return (
                <p key={index} className="editLabels">
                  {formatHeader(field)}:
                </p>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              flex: "1",
            }}
          >
            {personalInfoKeysOrder?.map((field, index) => {
              const isDate = field === "birthDate";

              let inputType = "text";
              if (field === "age") inputType = "number";
              else if (field.toLowerCase().includes("phone")) inputType = "tel";
              else if (isDate) inputType = "date";

              return (
                <input
                  type={inputType ? inputType : "text"}
                  key={index}
                  name={field}
                  placeholder={
                    isDate
                      ? formatDateForPlaceholder(formData[field])
                      : formData[field]
                  }
                  value={
                    isDate
                      ? formatDateForInput(formData[field])
                      : formData[field]
                  }
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="editPersonalInput"
                />
              );
            })}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <button className="saveChangesButton" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      {iseLoading && <SpinnerLoading />}
    </>
  );
};

export default EditPersonalInfo;
