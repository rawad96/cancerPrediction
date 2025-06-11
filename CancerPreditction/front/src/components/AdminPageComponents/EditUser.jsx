import { useState } from "react";
import "./AdminComponents.css";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { usersUrl } from "../../constants/APIs";
import DeleteUser from "./DeleteUser";
import { userKeysOrder } from "../../constants/States";

const EditUser = ({ user, updated, close, deletedU }) => {
  const [enableInput, setEnableInput] = useState(null);
  const [formData, setformData] = useState({ ...user });
  const [deleteUser, setdeleteUser] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (key, value) => {
    setformData((prev) => ({ ...prev, [key]: value }));
  };

  console.log(user);

  const formatKey = (key) => {
    if (!key) return "";
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
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
    return Object.entries(formData).some(([key, value]) => value !== user[key]);
  };

  const handleSave = async () => {
    if (!isDataChanged()) {
      alert("Nothing to update!");
      return;
    }
    setisLoading(true);
    const isNewPass = formData.password && formData.password !== user.password;
    try {
      const response = await axios.put(`${usersUrl}/${user._id}`, {
        formData,
        isNewPass,
      });

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
      <div className="editUserDiv">
        <div style={{ textAlign: "right", paddingBottom: "3%" }}>
          <IoMdClose
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => close()}
          />
        </div>
        <h2>Edit User</h2>

        {user && (
          <div
            style={{
              marginTop: "4%",
              marginBottom: "2%",
              textAlign: "left",
            }}
          >
            {userKeysOrder.map((key) => {
              const value = user[key];
              if (value === undefined) return null;
              const isDate =
                key === "birthDate" ||
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
                    {key === "_id" ? "Db Id" : formatKey(key)}:
                  </label>
                  {key === "permissions" ? (
                    <select
                      value={formData[key]?.[0] || ""}
                      disabled={enableInput !== key}
                      onChange={(e) => handleChange(key, [e.target.value])}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                      }}
                    >
                      <option value="">Select Role</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
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
                  {key !== "updatedAt" &&
                    key !== "createdAt" &&
                    key !== "_id" && (
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
            onClick={() => setdeleteUser(true)}
            style={{ margin: "1px" }}
            className="deleteButton"
          >
            Delete User
          </button>
        </div>
      </div>
      {deleteUser && (
        <DeleteUser
          idForDelete={user._id}
          closeDiv={() => setdeleteUser(false)}
          deleted={() => {
            setdeleteUser(false);
            deletedU(user._id);
            close();
          }}
        />
      )}
    </>
  );
};

export default EditUser;
