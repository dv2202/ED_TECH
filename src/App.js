import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/core/homepage/common/NavBar"
import OpenRoute from "./components/core/Auth/OpenRoute.jsx"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
function App() {
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
      </Routes>
    </div>
  );
}

export default App;
