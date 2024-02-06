import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/core/homepage/common/NavBar"
import OpenRoute from "./components/core/Auth/OpenRoute.jsx"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/updatePassword";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Dashboard from "./pages/Dashboard";
import MyProfile from '../src/components/core/Dashboard/Myprofile'
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-full bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    
  <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  
    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              < ForgotPassword/>
            </OpenRoute>
          }
        />
    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              < UpdatePassword/>
            </OpenRoute>
          }
        />
    <Route
          path="about"
          element={
            <OpenRoute>
              < About/>
            </OpenRoute>
          }
        />
    <Route
          path="contact"
          element={
              < Contactus/>
          }
    />
    <Route 

      element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute> 
      }
    >
    <Route path="dashboard/my-profile" element={<MyProfile />} />
    <Route path="dashboard/settings" element={<Settings />} />
    {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="dashboard/cart" element={<Cart />} />
        </>
      )
    }
    </Route>


    <Route path="*" element={<Error/>}/>

    </Routes>

    </div>
  );
}

export default App;
