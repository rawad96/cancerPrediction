import ViewLoading from "../LoadingComponents/ViewLoading";
import { Suspense, lazy, useState } from "react";
import AddNewUser from "../../components/AdminPageComponents/AddNewUser";
import AllSupports from "./AllSupports";

const PersonalData = lazy(() =>
  import("../../components/AdminPageComponents/PersonalData")
);
const AllUsers = lazy(() =>
  import("../../components/AdminPageComponents/AllUsers")
);

const MainViewAdminPage = ({ activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case "all":
        return (
          <Suspense fallback={<ViewLoading />}>
            <AllUsers />
          </Suspense>
        );
      case "add":
        return <AddNewUser />;
      case "supports":
        return (
          <Suspense fallback={<ViewLoading />}>
            <AllSupports />
          </Suspense>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <>
      <div className="adminMainView">{renderContent()}</div>
    </>
  );
};

export default MainViewAdminPage;
