import axios from "axios";
import { patientsUrl } from "../../constants/APIs";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const DeletePatient = ({
  idForDelete,
  closeDiv,
  deleted,
  patientsForDelete,
}) => {
  const [confirmText, setconfirmText] = useState("");
  const [wrongConfirmText, setwrongConfirmText] = useState(false);

  const deletePatient = async () => {
    try {
      if (confirmText === "Delete Patient") {
        if (idForDelete) {
          const response = await axios.delete(`${patientsUrl}/${idForDelete}`);

          if (!response) {
            throw new Error("Somthing went wrong!");
          }
          alert("Patient deleted successfully");
          deleted();
        } else {
          const response = await axios.delete(`${patientsUrl}/delete/multi`, {
            data: { ids: patientsForDelete },
          });

          if (!response) {
            throw new Error("Somthing went wrong!");
          }
          alert("Patients deleted successfully");
          deleted();
        }
      } else {
        setwrongConfirmText(true);
      }
    } catch (error) {
      alert("Somthing went wrong!: " + error.message);
    }
  };

  return (
    <>
      <div className="deletePatientDiv">
        <div
          style={{
            display: "flex",
            padding: "2%",
            borderBottom: "1px solid black",
          }}
        >
          <h5>Delete Patient</h5>
          <IoMdClose
            size={25}
            style={{ cursor: "pointer", marginLeft: "auto" }}
            onClick={() => closeDiv()}
          />
        </div>
        <div
          style={{ textAlign: "center", paddingTop: "3%", paddingBottom: "3%" }}
        >
          <strong style={{ fontSize: "20px" }}>
            Are you sure you want to delete this patient permanently?
          </strong>
          <br />
          <span>Please type "</span>
          <em>Delete Patient</em>
          <span>" to confirm</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            onChange={(e) => setconfirmText("Delete Patient")}
            style={{
              borderColor: !wrongConfirmText ? "rgb(136, 136, 136)" : "red",
            }}
          />
        </div>

        <div style={{ paddingTop: "2%", textAlign: "center", marginTop: "2%" }}>
          <button
            onClick={deletePatient}
            style={{ margin: "1px" }}
            className="deleteButton"
          >
            Delete Patient
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePatient;
