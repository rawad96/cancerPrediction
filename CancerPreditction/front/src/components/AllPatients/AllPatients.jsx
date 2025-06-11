import axios from "axios";
import { patientsUrl } from "../../constants/APIs";
import { useEffect, useMemo, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import "./AllPatients.css";

ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from "ag-grid-react";
import EditPatient from "../EditPatient/EditPatient";
import AppLayer from "../AppLayer/AppLayer";
import DeletePatient from "../EditPatient/DeletePatient";

const myTheme = themeQuartz.withParams();

const AllPatients = () => {
  const [allPatients, setallPatients] = useState([]);
  const [editPatient, seteditPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deletePatient, setdeletePatient] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(patientsUrl);
      setallPatients([...data]);
    };
    fetchData();
  }, []);

  const updatePatient = (UpdatedPatient) => {
    setallPatients((prevPatients) =>
      prevPatients.map((prev) =>
        prev._id === UpdatedPatient._id ? UpdatedPatient : prev
      )
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "fullname",
        headerName: "Full Name",
        filter: "agTextColumnFilter",
        width: 300,
      },
      {
        field: "patientId",
        headerName: "Patient Id",
        filter: "agTextColumnFilter",
        width: 300,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
    ],
    []
  );

  const handleRowClick = (event) => {
    setSelectedPatient(event.data);
    seteditPatient(true);
  };

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const handleSelectionChange = (event) => {
    const selected = event.api.getSelectedRows();
    const ids = selected.map((row) => row.patientId);
    setSelectedRows(ids);
  };

  const afterDeletion = () => {
    setallPatients((prevPatients) =>
      prevPatients.filter((patient) => !selectedRows.includes(patient._id))
    );
  };

  const afterDeletionSingle = (e) => {
    setallPatients((prevPatients) =>
      prevPatients.filter((patient) => e !== patient._id)
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
          onClick={() => setdeletePatient(true)}
        >
          Delete
        </button>
      </div>

      <div style={{ height: 500 }}>
        <AgGridReact
          theme={myTheme}
          rowData={allPatients}
          columnDefs={columnDefs}
          onRowClicked={handleRowClick}
          getRowStyle={() => ({ cursor: "pointer" })}
          rowSelection={rowSelection}
          onSelectionChanged={handleSelectionChange}
        />
      </div>

      {editPatient && (
        <EditPatient
          patient={selectedPatient}
          updated={(e) => {
            updatePatient(e);
            seteditPatient(false);
          }}
          close={() => {
            seteditPatient(false);
          }}
          deletedP={(e) => afterDeletionSingle(e)}
        />
      )}
      {editPatient && <AppLayer />}
      {deletePatient && (
        <DeletePatient
          patientsForDelete={selectedRows}
          closeDiv={() => setdeletePatient(false)}
          deleted={() => {
            afterDeletion();
            setdeletePatient(false);
          }}
        />
      )}
    </>
  );
};

export default AllPatients;
