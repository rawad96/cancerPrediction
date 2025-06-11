import "./AddNewPatient.css";
import { useState } from "react";
import axios from "axios";
import { patientsUrl } from "../../constants/APIs";

const initialFormData = {
  patientId: "",
  fullname: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  age: "",
  medicalHistory: "",
  description: "",
};

const AddNewPatient = () => {
  const [formData, setFormData] = useState(initialFormData);

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
      const res = await axios.post(patientsUrl, formData);
      alert("Patient added successfully");
      setFormData(initialFormData);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>New Patient</h2>
        <div style={{ textAlign: "center" }}>
          <span>Please fill out the entire form to add a new patient</span>
        </div>
        <form onSubmit={handleSubmit} className="addNewPatientForm">
          <div>
            <input
              type="text"
              name="patientId"
              placeholder="Patient Id"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date Of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <textarea
              type="text"
              name="medicalHistory"
              placeholder="Medical History"
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddNewPatient;
