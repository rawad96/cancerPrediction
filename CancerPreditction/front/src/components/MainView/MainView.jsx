import ViewLoading from "../LoadingComponents/ViewLoading";
import NewPrediction from "../NewPrediction/NewPrediction";
import "./MainView.css";
import { Suspense, lazy, useState } from "react";
const AddNewPatient = lazy(() => import("../AddNewPatient/AddNewPatient"));
const AllPatients = lazy(() => import("../AllPatients/AllPatients"));
const PredictionHistory = lazy(() =>
  import("../PredictionHistory/PredictionHistory")
);

const MainView = ({ activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case "add":
        return (
          <Suspense>
            <AddNewPatient />
          </Suspense>
        );
      case "all":
        return (
          <Suspense fallback={<ViewLoading />}>
            <AllPatients />
          </Suspense>
        );
      case "new":
        return (
          <Suspense>
            <NewPrediction />
          </Suspense>
        );
      case "history":
        return (
          <Suspense fallback={<ViewLoading />}>
            <PredictionHistory />
          </Suspense>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <>
      <div className="mainView">{renderContent()}</div>
    </>
  );
};

export default MainView;
