import axios from "axios";
import "../css/Login.css";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";
import Alert from "react-bootstrap/Alert";
import { auth } from "../constants/APIs";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../components/LoadingComponents/SpinnerLoading";
import AppLayer from "../components/AppLayer/AppLayer";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [wrongEmail, setwrongEmail] = useState(null);
  const [wrongPass, setwrongPass] = useState(null);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const Loginn = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("Admin");
    setloading(true);

    const loginData = { email: email, password: password };

    const resp = await axios.post(auth, loginData);
    if (resp.data === "Email is incorrect") {
      setloading(null);
      setwrongEmail("Email is incorrect");
      setwrongPass(null);
    } else if (resp.data === "Password is incorrect") {
      setloading(null);
      setwrongPass("Password is incorrect");
      setwrongEmail(null);
    } else {
      setloading(null);
      const decode = jwtDecode(resp.data.accessToken);
      sessionStorage.setItem("userId", resp.data.userId);
      sessionStorage.setItem("accessToken", resp.data.accessToken);
      sessionStorage.setItem("time", resp.data.localDateTime);

      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="mainDiv">
        <div className="ribbonDiv"></div>
        <div className="dataDiv">
          <div className="formDiv">
            <form onSubmit={Loginn}>
              <h2 className="formTitle">Login</h2>
              <div className="formGroup iconInput">
                <label htmlFor="Email">Email:</label>
                <div className="inputWithIcon">
                  <IoPersonOutline className="inputIcon" />
                  <input
                    type="text"
                    id="Email"
                    name="Email"
                    placeholder="Enter your email"
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="formGroup iconInput">
                <label htmlFor="Password">Password:</label>
                <div className="inputWithIcon">
                  <CiLock className="inputIcon" />
                  <input
                    type="password"
                    id="Password"
                    name="Password"
                    placeholder="Enter your password"
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ textAlign: "right", marginBottom: "3rem" }}>
                <span className="forgotPassSpan">Forgot password?</span>
              </div>

              <div className="buttonDiv">
                <button type="submit">Login</button>
              </div>
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                {loading && <SpinnerLoading />}
              </div>
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                {wrongEmail && <Alert variant="danger">{wrongEmail}</Alert>}
                {wrongPass && <Alert variant="danger">{wrongPass}</Alert>}
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <AppLayer />}
    </>
  );
};

export default Login;
