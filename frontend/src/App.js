import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DesignOne from "./Designs/DesignOne/DesignOne";
import CreateAccount from "./Pages/CreateAccount";
import ForgotPassword from "./Pages/ForgotPassword";
import Google from "./Pages/Google";
import Landingpage from "./Pages/Landingpage";
import LoginPage from "./Pages/LoginPage";
import UserHome from "./Pages/UserHome";
import RazorpayApp from "./RazorpayApi/RazorpayApp"
import { useParams } from "react-router-dom";
function App() {

  return (
    <div className="App">
    {/* <DesignOne /> */}
     {/* <RazorpayApp />  */}
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="userLogin" element={<LoginPage />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      <Route path="CreateAccount" element={<CreateAccount />} />
      <Route path="UserHome/*" element={<UserHome/>} />
      <Route path="dukaan=:dukaan/*" element ={<DesignOne />} />

    </Routes>
  </BrowserRouter> 
  
    </div>
  );
}

export default App;
