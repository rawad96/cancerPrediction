import { useEffect, useMemo, useState } from "react";
import "./PredictionHistory.css";
import { fields } from "../../constants/States";
import "./PredictionHistory.css";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from "ag-grid-react";

const myTheme = themeQuartz.withParams();

const ViewPredictionData = ({ data }) => {
  const [allInputData, setallInputData] = useState([]);

  const formatHeader = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const row = {};
    fields.forEach((field, index) => {
      row[field] = data[index];
    });

    setallInputData([row]);
  }, [data]);

  const columnDefs = useMemo(() => {
    return fields.map((field) => ({
      field: field,
      headerName: formatHeader(field),
      resizable: true,
    }));
  }, [fields]);

  return (
    <>
      <div className="viewPredictionDataContainer">
        <AgGridReact
          theme={myTheme}
          rowData={allInputData}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
};

export default ViewPredictionData;
