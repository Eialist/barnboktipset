import Navbar from "../../components/Navbar/Navbar";
import search from "../../assets/icons/search-dark.png";
import reading from "../../assets/icons/read-dark.png";
import comment from "../../assets/icons/comment-dark.png";
import lvl from "../../assets/icons/lvl-up-dark.png";
import "./welcome-page.css";
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar props={""} />
      <div className="welcome-bg">
        <div
          className="welcome-text-container"
          style={{
            height: "100%",
            margin: "0 auto",
            padding: "5em 3em",
            color: "rgb(20,40,54)",
            textAlign: "center",
            fontWeight: "500",
            fontSize: "18px",
          }}>
          <h2 className="welcome-title">Välkommen!</h2>
          <p style={{ fontSize: "12px" }}>
            Du är nu medlem och redo att börja tjäna poäng! <br></br>Här är en
            snabbguide för att komma igång:
          </p>
          <p style={{ fontSize: "12px" }}></p>
          <hr />
          <div className="welcome-how-to mt-3">
            <img src={search} alt="" height={30} className="mb-2" />
            <p>
              Använd sökfunktionen för att hitta böcker och läs andras
              kommentarer om dem. Det är ett enkelt sätt att upptäcka nya och
              bra böcker!
            </p>
          </div>
          <div className="welcome-how-to mt-5">
            <img src={reading} alt="" height={30} className="mb-2" />
            <p>
              När du hittat en bok du vill läsa, tryck på
              &quot;Läser&quot;-knappen för att lägga till den i din profil.
            </p>
          </div>
          <div className="welcome-how-to mt-5">
            <img src={comment} alt="" height={30} className="mb-2" />
            <p>
              Efter att du läst klart en bok, skriv en recension och tjäna
              poäng!
            </p>
          </div>
          <div className="welcome-how-to mt-5 mb-5">
            <img src={lvl} alt="" height={30} className="mb-2" />
            <p>
              Använd dina poäng för att öka i nivå och låsa upp nya titlar och
              roliga avatarer.
            </p>
          </div>
          <button className="btn btn-dark mb-4" onClick={() => navigate("/")}>
            Logga in
          </button>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
