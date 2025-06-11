import { useState } from "react";
import "./EditPatient.css";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { patientsUrl } from "../../constants/APIs";
import DeletePatient from "./DeletePatient";

const EditPatient = ({ patient, close, updated, deletedP }) => {
  const [enableInput, setEnableInput] = useState(null);
  const [formData, setformData] = useState({ ...patient });
  const [deletePatient, setdeletePatient] = useState(false);

  const handleChange = (key, value) => {
    setformData((prev) => ({ ...prev, [key]: value }));
  };

  const formatDateForInput = (val) => {
    const d = new Date(val);
    if (isNaN(d)) return "";
    return d.toISOString().split("T")[0];
  };

  const formatDateForPlaceholder = (val) => {
    const d = new Date(val);
    if (isNaN(d)) return "";
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const isDataChanged = () => {
    return Object.entries(formData).some(
      ([key, value]) => value !== patient[key]
    );
  };

  const handleSave = async () => {
    if (!isDataChanged()) {
      alert("Nothing to update!");
      return;
    }

    try {
      const response = await axios.put(
        `${patientsUrl}/${patient._id}`,
        formData
      );

      if (!response) {
        throw new Error("Somthing went wrong!");
      }

      alert("Data updated successfully");
      updated(formData);
    } catch (error) {
      alert("Somthing went wrong!: " + error.message);
    }
  };

  return (
    <>
      <div className="editPatientDiv">
        <div style={{ textAlign: "right", paddingBottom: "3%" }}>
          <IoMdClose
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => close()}
          />
        </div>
        <h2>Edit Patient</h2>

        {patient && (
          <div
            style={{
              marginTop: "4%",
              marginBottom: "2%",
              textAlign: "left",
            }}
          >
            {Object.entries(patient).map(([key, value]) => {
              const isTextArea =
                key === "medicalHistory" || key === "description";
              const isDate =
                key === "dateOfBirth" ||
                key === "updatedAt" ||
                key === "createdAt";

              let inputType = "text";
              if (key === "age") inputType = "number";
              else if (key.toLowerCase().includes("phone")) inputType = "tel";
              else if (isDate) inputType = "date";

              return (
                <div
                  key={key}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <label
                    style={{
                      minWidth: "120px",
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </label>

                  {isTextArea ? (
                    <textarea
                      placeholder={value}
                      value={formData[key]}
                      disabled={enableInput !== key}
                      onChange={(e) => handleChange(key, e.target.value)}
                      style={{
                        flex: 1,
                        padding: "6px",
                        height: "80px",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    <input
                      type={inputType}
                      placeholder={
                        isDate ? formatDateForPlaceholder(value) : String(value)
                      }
                      value={
                        isDate
                          ? formatDateForInput(formData[key])
                          : formData[key]
                      }
                      disabled={enableInput !== key}
                      onChange={(e) => handleChange(key, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                      }}
                    />
                  )}

                  {key !== "updatedAt" && key !== "createdAt" && (
                    <FiEdit
                      size={20}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setEnableInput(key)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <button
            onClick={handleSave}
            style={{ margin: "1px" }}
            className="saveButton"
          >
            Save
          </button>
          <button
            onClick={() => setdeletePatient(true)}
            style={{ margin: "1px" }}
            className="deleteButton"
          >
            Delete Patient
          </button>
        </div>
      </div>
      {deletePatient && (
        <DeletePatient
          idForDelete={patient.patientId}
          closeDiv={() => setdeletePatient(false)}
          deleted={() => {
            setdeletePatient(false);
            deletedP(patient._id);
            close();
          }}
        />
      )}
    </>
  );
};

export default EditPatient;
