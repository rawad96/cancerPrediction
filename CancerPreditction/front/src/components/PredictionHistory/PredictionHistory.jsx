import { useEffect, useMemo, useState } from "react";
import "./PredictionHistory.css";
import axios from "axios";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from "ag-grid-react";
import { predictionUrl } from "../../constants/APIs";
import ViewPredictionData from "./ViewPredictionData";
import AppLayer from "../AppLayer/AppLayer";
import DeletePrediction from "./DeletePrediction";
const myTheme = themeQuartz.withParams();

const PredictionHistory = () => {
  const [allPredictions, setallPredictions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [predictionData, setpredictionData] = useState([]);
  const [selectedPatient, setselectedPatient] = useState(null);
  const [PatientPredictions, setPatientPredictions] = useState(false);
  const [deletePrediction, setdeletePrediction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(predictionUrl);

      const flatData = data.flatMap((patient) =>
        patient.predictionData.map((prediction, index) => ({
          id: `${patient.patientId}-${index}`,
          patientId: patient.patientId,
          cancerType: prediction.cancerType,
          prediction: prediction.prediction,
          probability: prediction.probability,
          predictionDate: new Date(prediction.createdAt).toLocaleString(),
          inputData: prediction.inputData,
          _id: prediction._id,
        }))
      );

      setallPredictions(flatData);
      console.log(flatData);
    };
    fetchData();
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        field: "patientId",
        filter: true,
        floatingFilter: true,
        width: 200,
      },
      {
        field: "cancerType",
        headerName: "Cancer type",
        flex: 1,
      },
      {
        field: "prediction",
        headerName: "Prediction",
        flex: 1,
      },
      {
        field: "probability",
        headerName: "Probability",
        flex: 1,
      },
      {
        field: "predictionDate",
        headerName: "Prediction Date",
        flex: 1,
      },
      {
        headerName: "Input data",
        cellRenderer: (params) => {
          return (
            <button
              onClick={() => {
                setpredictionData(params.data.inputData);
              }}
              className="viewDataButton"
            >
              View Data
            </button>
          );
        },
        flex: 1,
      },
    ],
    []
  );

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const handleSelectionChange = (event) => {
    const selected = event.api.getSelectedRows();
    const ids = selected.map((row) => row._id);
    setSelectedRows(ids);
  };

  const afterDeletion = () => {
    setallPredictions((prevPredictions) =>
      prevPredictions.filter(
        (prediction) => !selectedRows.includes(prediction._id)
      )
    );
  };

  return (
    <>
      <div
        style={{
          textAlign: "right",
          display: selectedRows.length > 0 ? "block" : "none",
        }}
      >
        <button
          className="deletePatientButton"
          onClick={() => setdeletePrediction(true)}
        >
          Delete
        </button>
      </div>

      <div style={{ height: 500 }}>
        <AgGridReact
          theme={myTheme}
          rowData={allPredictions}
          columnDefs={columnDefs}
          rowSelection={rowSelection}
          rowHeight={60}
          onSelectionChanged={handleSelectionChange}
        />
      </div>

      {predictionData.length > 0 && (
        <AppLayer closeLayer={() => setpredictionData([])} />
      )}
      {predictionData.length > 0 && (
        <ViewPredictionData data={predictionData} />
      )}

      {deletePrediction && (
        <DeletePrediction
          predictionsForDelete={selectedRows}
          closeDiv={() => setdeletePrediction(false)}
          deleted={() => {
            afterDeletion();
            setdeletePrediction(false);
          }}
        />
      )}
    </>
  );
};

export default PredictionHistory;
