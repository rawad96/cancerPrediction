import { useEffect, useState } from "react";
import { usersUrl } from "../../constants/APIs";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const initialFormData = {
  fullName: "",
  idNumber: "",
  email: "",
  phone: "",
  password: "",
  licenseNumber: "",
  specialization: "",
  gender: "",
  birthDate: "",
  permissions: [],
};

const AddNewUser = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const res = await axios.post(usersUrl, formData);
      if (res.data === "Email exsists") {
        setisLoading(false);
        alert("Email exsists");
      } else {
        setisLoading(false);
        alert("User added successfully");
        setFormData(initialFormData);
      }
    } catch (err) {
      setisLoading(false);
      alert(err);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>Add New User</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: "center" }}
        className="adduserForm"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            required
            name="fullName"
            onChange={handleChange}
            placeholder="Full Name"
            value={formData["fullName"]}
          />
          <input
            type="text"
            required
            name="idNumber"
            onChange={handleChange}
            placeholder="Id Number"
            value={formData["idNumber"]}
          />
          <input
            type="text"
            required
            name="email"
            onChange={handleChange}
            placeholder="Email"
            value={formData["email"]}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            required
            name="phone"
            onChange={handleChange}
            placeholder="Phone Number"
            value={formData["phone"]}
          />
          <input
            type="text"
            required
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={formData["password"]}
          />
          <input
            type="text"
            required
            name="licenseNumber"
            onChange={handleChange}
            placeholder="License Number"
            value={formData["licenseNumber"]}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            required
            name="specialization"
            onChange={handleChange}
            placeholder="Specialization"
            value={formData["specialization"]}
          />

          <select
            name="gender"
            value={formData["gender"]}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            name="birthDate"
            placeholder="Date Of Birth"
            value={formData["birthDate"]}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p style={{ marginTop: "2rem", color: "#b35c00" }}>
            Please make sure all fields are correctly filled in and the
            information is accurate before submitting.
          </p>
        </div>

        <div>
          <input
            type="checkbox"
            id="confirmData"
            required
            style={{ padding: "0", margin: "0", minWidth: "unset" }}
          />
          <label htmlFor="confirmData" style={{ marginLeft: "1%" }}>
            I confirm that the information I provided is true and accurate to
            the best of my knowledge.
          </label>
        </div>

        <button type="submit">Save</button>

        {isLoading && (
          <div>
            <Spinner animation="grow" role="status"></Spinner>
          </div>
        )}
      </form>
    </>
  );
};

export default AddNewUser;
