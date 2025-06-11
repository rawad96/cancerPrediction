import "./AdminComponents.css";
import axios from "axios";
import { usersUrl } from "../../constants/APIs";
import { useEffect, useMemo, useState } from "react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from "ag-grid-react";
import AppLayer from "../AppLayer/AppLayer";

const myTheme = themeQuartz.withParams();

const AllUsers = () => {
  const [allUsers, setallUsers] = useState([]);
  const [editUser, seteditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteUser, setdeleteUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(usersUrl);
      setallUsers([...data]);
    };
    fetchData();
  }, []);

  const updateUser = (UpdatedUser) => {
    setallUsers((prevUsers) =>
      prevUsers.map((prev) =>
        prev._id === UpdatedUser._id ? UpdatedUser : prev
      )
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Full Name",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        width: 300,
      },
      {
        field: "idNumber",
        headerName: "Id",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        width: 300,
      },
      {
        field: "email",
        headerName: "Email",
      },
      {
        field: "phone",
        headerName: "Phone",
      },
      {
        field: "licenseNumber",
        headerName: "License Number",
      },
      {
        field: "specialization",
        headerName: "Specialization",
      },
      {
        field: "gender",
        headerName: "Gender",
      },
      {
        field: "birthDate",
        headerName: "Birth Date",
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
      {
        headerName: "Permissions",
        field: "permissions",
        valueGetter: (params) => {
          const permissions = params.data.permissions;
          return Array.isArray(permissions) && permissions.length > 0
            ? permissions[0]
            : "None";
        },
      },
    ],
    []
  );

  const handleRowClick = (event) => {
    setSelectedUser(event.data);
    seteditUser(true);
  };

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
    setallUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedRows.includes(user._id))
    );
  };

  const afterDeletionSingle = (e) => {
    setallUsers((prevUsers) => prevUsers.filter((user) => e !== user._id));
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
          onClick={() => setdeleteUser(true)}
        >
          Delete
        </button>
      </div>

      <div style={{ height: "100%" }}>
        <AgGridReact
          theme={myTheme}
          rowData={allUsers}
          columnDefs={columnDefs}
          onRowClicked={handleRowClick}
          getRowStyle={() => ({ cursor: "pointer" })}
          rowSelection={rowSelection}
          onSelectionChanged={handleSelectionChange}
        />
      </div>

      {editUser && (
        <EditUser
          user={selectedUser}
          updated={(e) => {
            updateUser(e);
            seteditUser(false);
          }}
          close={() => {
            seteditUser(false);
          }}
          deletedU={(e) => afterDeletionSingle(e)}
        />
      )}
      {editUser && <AppLayer />}
      {deleteUser && (
        <DeleteUser
          usersForDelete={selectedRows}
          closeDiv={() => setdeleteUser(false)}
          deleted={() => {
            afterDeletion();
            setdeleteUser(false);
          }}
        />
      )}
    </>
  );
};

export default AllUsers;
