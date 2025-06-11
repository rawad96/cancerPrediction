import { useEffect, useRef, useState } from "react";
import { patientsUrl } from "../../constants/APIs";
import "./NewPrediction.css";
import NewPredictionFormData from "./NewPredictionFormData";
import axios from "axios";
import { fields } from "../../constants/States";

const NewPrediction = () => {
  const [allPatients, setallPatients] = useState([]);
  const fileInputRef = useRef();
  const [selectedFile, setselectedFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [predictionResult, setpredictionResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${patientsUrl}/all/patients/ids`);
      setallPatients([...data]);
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setselectedFile(file.name);
    const reader = new FileReader();

    reader.onload = function (event) {
      const text = event.target.result;
      const [headerLine, valueLine] = text.trim().split("\n");

      const headers = headerLine.split(",");
      const values = valueLine.split(",");

      const dataObject = {};
      headers.forEach((header, index) => {
        const trimmedHeader = header.trim();
        if (fields.includes(trimmedHeader)) {
          dataObject[trimmedHeader] = values[index]?.trim() ?? "";
        }
      });

      setFormData(dataObject);
    };

    if (file) reader.readAsText(file);
  };

  return (
    <>
      <div className="newPredictionContainer">
        <div className="title">
          <h2>Add new prediction</h2>
        </div>
        <div
          style={{
            textAlign: "right",
            borderBottom: "1px solid rgb(150, 149, 149)",
          }}
        >
          {predictionResult && (
            <button
              style={{ float: "left" }}
              onClick={() => {
                setselectedFile(null);
                setpredictionResult(null);
                setFormData(null);
              }}
            >
              New Prediction
            </button>
          )}

          <input
            type="file"
            ref={fileInputRef}
            placeholder="Auto fill"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="autoFillButton"
            onClick={() => fileInputRef.current.click()}
          >
            {selectedFile ? selectedFile : "Auto fill"}
          </button>
        </div>
        {predictionResult === null && (
          <div
            style={{
              overflow: "auto",
              height: "100%",
              paddingTop: "2%",
              paddingBottom: "15%",
            }}
          >
            <div>
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "1rem",
                  color: "#333",
                }}
              >
                Please fill out the form below to perform a prediction. You can
                also upload a CSV file to auto-fill the form fields.
              </p>
            </div>
            <NewPredictionFormData
              patientsIds={allPatients}
              predictData={formData ? formData : null}
              getPredictoionResult={(e) => setpredictionResult(e)}
            />
          </div>
        )}
        {predictionResult && (
          <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
            <div style={{ textAlign: "center" }}>
              <h4>Prediction Result</h4>
            </div>
            <div>
              <p>Patient Id: {predictionResult.patientId}</p>
              <p>Cancer type: {predictionResult.cancerType}</p>
              <p>Prediction: {predictionResult.prediction}</p>
              <p>Probability: {predictionResult.probability}</p>
              <p>Prediction Date: {predictionResult.createdAt}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewPrediction;
