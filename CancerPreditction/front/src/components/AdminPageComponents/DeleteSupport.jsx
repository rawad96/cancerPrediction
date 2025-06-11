import axios from "axios";
import { supportsUrl } from "../../constants/APIs";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SpinnerLoading from "../LoadingComponents/SpinnerLoading";

const DeleteSupport = ({ supportsForDelete, closeDiv, deleted }) => {
  const [confirmText, setconfirmText] = useState("");
  const [wrongConfirmText, setwrongConfirmText] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const deleteSupport = async () => {
    setisLoading(true);
    try {
      if (confirmText === "Delete Support") {
        const response = await axios.delete(`${supportsUrl}/delete/multi`, {
          data: { ids: supportsForDelete },
        });

        if (!response) {
          throw new Error("Somthing went wrong!");
        }
        setisLoading(false);
        alert("Supports deleted successfully");
        deleted();
      } else {
        setisLoading(false);
        setwrongConfirmText(true);
      }
    } catch (error) {
      setisLoading(false);
      alert("Somthing went wrong!: " + error.message);
    }
  };

  return (
    <>
      <div className="deleteUserDiv">
        <div
          style={{
            display: "flex",
            padding: "2%",
            borderBottom: "1px solid black",
          }}
        >
          <h5>Delete Support</h5>
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
            Are you sure you want to delete this support permanently?
          </strong>
          <br />
          <span>Please type "</span>
          <em>Delete Support</em>
          <span>" to confirm</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            onChange={(e) => setconfirmText("Delete Support")}
            style={{
              borderColor: !wrongConfirmText ? "rgb(136, 136, 136)" : "red",
            }}
          />
        </div>

        <div style={{ paddingTop: "2%", textAlign: "center", marginTop: "2%" }}>
          <button
            onClick={deleteSupport}
            style={{ margin: "1px" }}
            className="deleteButton"
          >
            Delete Support
          </button>
        </div>
      </div>
      {isLoading && <SpinnerLoading />}
    </>
  );
};

export default DeleteSupport;
