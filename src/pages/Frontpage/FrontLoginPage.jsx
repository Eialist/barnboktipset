import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./frontloginpage.css";

const FrontLoginPage = () => {
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({});
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      return setMsg("Fyll i både användarnamn och lösenord för att logga in");
    }
    console.log(credentials);
    let headersList = { "Content-Type": "application/json" };
    let bodyContent = JSON.stringify(credentials);
    let res = await fetch("/api/auth/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await res.json();
    const userData = {
      username: data.username,
      password: data.password,
      userId: data._id,
    };
    sessionStorage.setItem("userInfo", JSON.stringify(userData));
    console.log(data);
    setMsg("hello");
    navigate("/user");
  };

  return (
    <>
      <Navbar />
      <div className="login-container container">
        <div className="login-text-container">
          <div className="d-flex flex-column align-items-center p-4">
            <span>{msg}</span>
            <form>
              <h4 className="login-text-info">Logga in</h4>
              <div className="form-group">
                <label htmlFor="username">Användarnamn</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  aria-describedby="usernameHelp"
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Lösenord</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  minLength={8}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }></input>
              </div>
              <div className="login-btn-container">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={loginUser}>
                  Logga in
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => navigate("/register")}>
                  Skapa användare
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontLoginPage;
