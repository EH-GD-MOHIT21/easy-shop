import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount";
import ForgotPassword from "./Pages/ForgotPassword";
import Google from "./Pages/Google";
import Landingpage from "./Pages/Landingpage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="userLogin" element={<LoginPage />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      <Route path="CreateAccount" element={<CreateAccount />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
