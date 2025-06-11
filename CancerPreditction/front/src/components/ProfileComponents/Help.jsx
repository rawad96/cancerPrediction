import { useRef, useState } from "react";
import axios from "axios";
import SpinnerLoading from "../LoadingComponents/SpinnerLoading";
import { IoCloudUploadOutline } from "react-icons/io5";
import { supportsUrl } from "../../constants/APIs";

const Help = ({ userData }) => {
  const [isLoading, setisLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [formData, setformData] = useState({
    userFullName: userData.fullName,
    userEmail: userData.email,
    userId: userData.idNumber,
    phoneNumber: userData.phone,
    department: "",
    subject: "",
    description: "",
  });

  const handleChange = (key, value) => {
    setformData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      alert("Images Only!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (selectedFile) {
      form.append("image", selectedFile);
    }

    try {
      const response = await axios.post(supportsUrl, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response) {
        throw new Error("Somthing went wrong!");
      }
      setformData((prev) => ({
        ...prev,
        department: "",
        subject: "",
        description: "",
      }));
      setSelectedFile(null);
      setisLoading(false);
      alert("Support sent successfully");
    } catch (error) {
      setisLoading(false);
      alert("Somthing went wrong!: " + error.message);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <h3>Support</h3>
        </div>
        <div className="supportForm">
          <form onSubmit={handleSave}>
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="text"
                name="userFullName"
                value={userData.fullName}
                disabled
                className="firstTwo"
              />
              <input
                type="text"
                name="email"
                value={userData.email}
                disabled
                className="firstTwo"
              />
            </div>
            <div>
              <input
                type="text"
                name="idNumber"
                value={userData.idNumber}
                disabled
              />
            </div>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={userData.phone}
                disabled
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData["department"]}
                onChange={(e) => handleChange("department", e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData["subject"]}
                onChange={(e) => handleChange("subject", e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData["description"]}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="file"
                name="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div
                className="inputFile"
                onClick={() => fileInputRef.current.click()}
              >
                {selectedFile ? (
                  selectedFile.name
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IoCloudUploadOutline size={25} />
                    <span>Upload File</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <SpinnerLoading />}
    </>
  );
};

export default Help;
