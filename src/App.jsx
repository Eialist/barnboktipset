import "./App.css";
import RegisterPage from "./pages/Register/RegisterPage";
import FrontLoginPage from "./pages/Frontpage/FrontLoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./pages/Userpage/UserPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
