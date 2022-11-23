import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DesignOne from "./Designs/DesignOne/DesignOne";
import DesignThree from "./Designs/DesignThree";
import DesignTwo from "./Designs/DesignTwo";
import CreateAccount from "./Pages/CreateAccount";
import ForgotPassword from "./Pages/ForgotPassword";
import Google from "./Pages/Google";
import Landingpage from "./Pages/Landingpage";
import LoginPage from "./Pages/LoginPage";
import UserHome from "./Pages/UserHome";


function App() {
  return (
    <div className="App">
    {/* <DesignOne /> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="userLogin" element={<LoginPage />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      <Route path="CreateAccount" element={<CreateAccount />} />
      <Route path="UserHome/*" element={<UserHome/>} />
      {/* <Route path="RoutOne" element={<DesignOne/>} /> */}
      {/* <Route path="RoutTwo" element={<DesignTwo/>} /> */}
      {/* <Route path="RoutThree" element={<DesignThree/>} /> */}
    </Routes>
  </BrowserRouter>
  
    </div>
  );
}

export default App;
