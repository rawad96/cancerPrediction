import "./AdminComponents.css";
import axios from "axios";
import { supportsUrl } from "../../constants/APIs";
import { useEffect, useMemo, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from "ag-grid-react";
import AppLayer from "../AppLayer/AppLayer";
import DeleteSupport from "./DeleteSupport";
import EditSupport from "./EditSupport";

const myTheme = themeQuartz.withParams();

const AllSupports = () => {
  const [allSupports, setallSupports] = useState([]);
  const [editSupport, seteditSupport] = useState(false);
  const [editRow, seteditRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteSupport, setdeleteSupport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(supportsUrl);
      setallSupports([...data]);
    };
    fetchData();
  }, []);

  const updateSupport = (UpdatedSupport) => {
    setallSupports((prevSupports) =>
      prevSupports.map((prev) =>
        prev._id === UpdatedSupport._id ? UpdatedSupport : prev
      )
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "userFullName",
        headerName: "Full Name",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        width: 300,
      },
      {
        field: "userId",
        headerName: "Id",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        width: 300,
      },
      {
        field: "userEmail",
        headerName: "Email",
      },
      {
        field: "phoneNUmber",
        headerName: "Phone",
      },
      {
        field: "department",
        headerName: "Department",
      },
      {
        field: "subject",
        headerName: "Subject",
      },
      {
        field: "description",
        headerName: "Description",
      },
      {
        field: "imageUrl",
        headerName: "Image",
        cellRenderer: (params) => {
          if (!params.value) return "No Image";
          return (
            <img
              src={params.value}
              alt="support"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => window.open(params.value, "_blank")}
            />
          );
        },
      },
      {
        field: "isResolved",
        headerName: "Status",
        cellRenderer: (params) => {
          return (
            <input
              type="checkbox"
              checked={params.value}
              style={{ cursor: "pointer" }}
              onChange={() => {
                const updatedRow = {
                  ...params.data,
                  isResolved: !params.value,
                };

                seteditSupport(true);
                seteditRow(updatedRow);
              }}
            />
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        valueGetter: (params) => {
          const date = new Date(params.data.createdAt).toLocaleString();
          return date;
        },
      },
      {
        field: "updatedAt",
        headerName: "Updated At",
        valueGetter: (params) => {
          const date = new Date(params.data.updatedAt).toLocaleString();
          return date;
        },
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
    setallSupports((prevSupports) =>
      prevSupports.filter((support) => !selectedRows.includes(support._id))
    );
  };

  const afterDeletionSingle = (e) => {
    setallSupports((prevSupports) =>
      prevSupports.filter((support) => e !== support._id)
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
          className="deleteUserButton"
          onClick={() => setdeleteSupport(true)}
        >
          Delete
        </button>
      </div>

      <div style={{ height: "100%" }}>
        <AgGridReact
          theme={myTheme}
          rowData={allSupports}
          columnDefs={columnDefs}
          getRowStyle={() => ({ cursor: "pointer" })}
          rowSelection={rowSelection}
          onSelectionChanged={handleSelectionChange}
        />
      </div>

      {editSupport && (
        <EditSupport
          support={editRow}
          updated={(e) => {
            updateSupport(e);
            seteditSupport(false);
          }}
          close={() => {
            seteditSupport(false);
          }}
        />
      )}
      {(editSupport || deleteSupport) && <AppLayer />}
      {deleteSupport && (
        <DeleteSupport
          supportsForDelete={selectedRows}
          closeDiv={() => setdeleteSupport(false)}
          deleted={() => {
            afterDeletion();
            setdeleteSupport(false);
          }}
        />
      )}
    </>
  );
};

export default AllSupports;
