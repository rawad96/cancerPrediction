import axios from "axios";
import { usersUrl } from "../../constants/APIs";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const DeleteUser = ({ idForDelete, usersForDelete, closeDiv, deleted }) => {
  const [confirmText, setconfirmText] = useState("");
  const [wrongConfirmText, setwrongConfirmText] = useState(false);

  const deleteUser = async () => {
    try {
      if (confirmText === "Delete User") {
        if (idForDelete) {
          const response = await axios.delete(`${usersUrl}/${idForDelete}`);

          if (!response) {
            throw new Error("Somthing went wrong!");
          }
          alert("User deleted successfully");
          deleted();
        } else {
          const response = await axios.delete(`${usersUrl}/delete/multi`, {
            data: { ids: usersForDelete },
          });

          if (!response) {
            throw new Error("Somthing went wrong!");
          }
          alert("Users deleted successfully");
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
      <div className="deleteUserDiv">
        <div
          style={{
            display: "flex",
            padding: "2%",
            borderBottom: "1px solid black",
          }}
        >
          <h5>Delete User</h5>
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
            Are you sure you want to delete this user permanently?
          </strong>
          <br />
          <span>Please type "</span>
          <em>Delete User</em>
          <span>" to confirm</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            onChange={(e) => setconfirmText("Delete User")}
            style={{
              borderColor: !wrongConfirmText ? "rgb(136, 136, 136)" : "red",
            }}
          />
        </div>

        <div style={{ paddingTop: "2%", textAlign: "center", marginTop: "2%" }}>
          <button
            onClick={deleteUser}
            style={{ margin: "1px" }}
            className="deleteButton"
          >
            Delete User
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
