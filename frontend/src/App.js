import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount";
import ForgotPassword from "./Pages/ForgotPassword";
import Google from "./Pages/Google";
import HomeAcsses from "./Pages/HomeAcsses";
import Landingpage from "./Pages/Landingpage";
import LoginPage from "./Pages/LoginPage";
import UserHome from "./Pages/UserHome";
import Verify from "./Pages/Verify";
function App() {
  return (
    <div className="App">
      
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="userLogin" element={<LoginPage />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      <Route path="CreateAccount" element={<CreateAccount />} />
      <Route path="/UserHome/*" element={<UserHome />} />
      <Route path="/Verify/:VerifyId" element={<Verify />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
