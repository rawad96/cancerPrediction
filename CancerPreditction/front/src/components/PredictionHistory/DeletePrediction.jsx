import { useState } from "react";
import { predictionUrl } from "../../constants/APIs";
import axios from "axios";
import "../EditPatient/EditPatient.css";
import { IoMdClose } from "react-icons/io";

const DeletePrediction = ({ predictionsForDelete, closeDiv, deleted }) => {
  const [confirmText, setconfirmText] = useState("");
  const [wrongConfirmText, setwrongConfirmText] = useState(false);

  const deletePrediction = async () => {
    try {
      if (confirmText === "Delete Predictions") {
        const response = await axios.delete(
          `${predictionUrl}/many/preditcions/by/_id`,
          {
            data: { ids: predictionsForDelete },
          }
        );

        if (!response) {
          throw new Error("Somthing went wrong!");
        }
        alert("Predictions deleted successfully");
        deleted();
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
          <h5>Delete Predictions</h5>
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
            Are you sure you want to delete this predictions permanently?
          </strong>
          <br />
          <span>Please type "</span>
          <em>Delete Predictions</em>
          <span>" to confirm</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            onChange={(e) => setconfirmText("Delete Predictions")}
            style={{
              borderColor: !wrongConfirmText ? "rgb(136, 136, 136)" : "red",
            }}
          />
        </div>

        <div style={{ paddingTop: "2%", textAlign: "center", marginTop: "2%" }}>
          <button
            onClick={deletePrediction}
            style={{ margin: "1px" }}
            className="deleteButton"
          >
            Delete Predictions
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePrediction;
