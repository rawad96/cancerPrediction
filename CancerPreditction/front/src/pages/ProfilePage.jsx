import axios from "axios";
import { useEffect, useState } from "react";
import "../css/profile.css";
import { usersUrl } from "../constants/APIs";
import MainNavbar from "../components/Navbar/MainNavbar";
import ProfileMenu from "../components/ProfileComponents/ProfileMenu";
import ProfileCompsView from "../components/ProfileComponents/ProfileCompsView";

const ProfilePage = () => {
  const [userData, setuserData] = useState({});
  const [selected, setselected] = useState("add");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${usersUrl}/${sessionStorage.getItem("userId")}`
      );
      setuserData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="profileContainer">
        {/* <MainNavbar /> */}
        <div style={{ textAlign: "center" }}>
          <h1>Profile</h1>
        </div>
        <div className="profileFlexDiv">
          <ProfileMenu getView={(e) => setselected(e)} />
          <ProfileCompsView activeView={selected} user={userData} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
