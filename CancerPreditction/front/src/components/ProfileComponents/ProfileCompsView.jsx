import ViewLoading from "../LoadingComponents/ViewLoading";
import { Suspense, lazy } from "react";
const PersonalInfo = lazy(() => import("./PersonalInfo"));
const EditPersonalInfo = lazy(() => import("./EditPersonalInfo"));
import Help from "./Help";

const ProfileCompsView = ({ activeView, user }) => {
  const renderContent = () => {
    switch (activeView) {
      case "personal":
        return (
          <Suspense fallback={<ViewLoading />}>
            <PersonalInfo userData={user} />
          </Suspense>
        );
      case "help":
        return (
          <Suspense>
            <Help userData={user} />
          </Suspense>
        );
      case "edit":
        return (
          <Suspense fallback={<ViewLoading />}>
            <EditPersonalInfo userData={user} />
          </Suspense>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <>
      <div className="ProfileCompsView">{renderContent()}</div>
    </>
  );
};

export default ProfileCompsView;
