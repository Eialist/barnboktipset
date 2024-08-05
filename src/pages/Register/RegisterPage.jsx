import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./register-page.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({});

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("hello");
    if (
      !credentials.username ||
      !credentials.password ||
      !credentials.secretword
    ) {
      return setMsg("Vänligen fyll i alla fält för att registrera dig.");
    }
    console.log(credentials);
    let headersList = { "Content-Type": "application/json" };
    let bodyContent = JSON.stringify(credentials);
    let res = await fetch("/api/auth/registerUser", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await res.json();
    console.log(data);
    setMsg(data.msg);
    navigate("/welcome");
  };

  return (
    <>
      <Navbar />
      <div className="register-container container">
        <div className="register-text-container">
          <div className="d-flex flex-column align-items-start">
            <span>{msg}</span>
            <div className="d-flex flex-column align-items-center m-auto pt-4">
              <form className="">
                <div className="form-group">
                  <h4 className="register-text-info pb-3">
                    Skapa ny användare
                  </h4>
                  <label htmlFor="username">Välj ett användarnamn</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="usernameHelp"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }></input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Välj ett lösenord</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    minLength={8}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }></input>
                </div>
                <div className="form-group pb">
                  <label htmlFor="secretWord">Välj ett hemligt ord</label>
                  <input
                    type="secretword"
                    className="form-control"
                    id="secretWord"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        secretword: e.target.value,
                      })
                    }></input>
                </div>
                <button
                  type="button"
                  className="btn btn-dark mb-3"
                  onClick={registerUser}>
                  Registrera
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
