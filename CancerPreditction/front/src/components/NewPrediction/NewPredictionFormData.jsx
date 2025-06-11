import { useEffect, useState } from "react";
import { cancerTypes, fields } from "../../constants/States";
import { predictionUrl } from "../../constants/APIs";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const NewPredictionFormData = ({
  patientsIds,
  predictData,
  getPredictoionResult,
}) => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedCancerType, setselectedCancerType] = useState("");
  const [customPatient, setCustomPatient] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (predictData && Object.keys(predictData).length > 0) {
      setFormData(predictData);
    }
  }, [predictData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const dataToSend = fields.map((field) => {
      const value = formData[field];
      const numberValue = parseFloat(value);
      return isNaN(numberValue) ? null : numberValue;
    });

    try {
      const res = await axios.post(`${predictionUrl}/${selectedPatient}`, {
        patientData: dataToSend,
        cancerType: selectedCancerType,
      });

      if (res) {
        setisLoading(false);
        getPredictoionResult(res.data);
      }
    } catch (err) {
      setisLoading(false);
      alert(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <select
            value={selectedPatient}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "other") {
                setCustomPatient(true);
                setSelectedPatient("");
              } else {
                setSelectedPatient(value);
                setCustomPatient(false);
              }
            }}
          >
            <option value="">Select Patient</option>
            {patientsIds?.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={selectedPatient}
            placeholder={selectedPatient ? selectedPatient : "Patient Id"}
            disabled
          />

          <select
            value={selectedCancerType}
            onChange={(e) => {
              setselectedCancerType(e.target.value);
            }}
            required
          >
            <option value="">Select cancer type</option>
            {cancerTypes?.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {Array.from({ length: Math.ceil(fields.length / 3) }, (_, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="text"
              required
              name={fields[i * 3]}
              onChange={handleChange}
              placeholder={fields[i * 3]}
              value={
                formData[fields[i * 3]] !== undefined
                  ? formData[fields[i * 3]]
                  : predictData?.[fields[i * 3]] || ""
              }
            />
            {fields[i * 3 + 1] && (
              <input
                type="text"
                required
                name={fields[i * 3 + 1]}
                onChange={handleChange}
                placeholder={fields[i * 3 + 1]}
                value={
                  formData[fields[i * 3 + 1]] !== undefined
                    ? formData[fields[i * 3 + 1]]
                    : predictData?.[fields[i * 3 + 1]] || ""
                }
              />
            )}
            {fields[i * 3 + 2] && (
              <input
                type="text"
                required
                name={fields[i * 3 + 2]}
                onChange={handleChange}
                placeholder={fields[i * 3 + 2]}
                value={
                  formData[fields[i * 3 + 2]] !== undefined
                    ? formData[fields[i * 3 + 2]]
                    : predictData?.[fields[i * 3 + 2]] || ""
                }
              />
            )}
          </div>
        ))}

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

        <button type="submit">Predic</button>

        {isLoading && (
          <div>
            <Spinner animation="grow" role="status"></Spinner>
          </div>
        )}
      </form>
    </>
  );
};

export default NewPredictionFormData;
