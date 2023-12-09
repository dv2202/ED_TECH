import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/core/homepage/common/NavBar"
function App() {
  return (
    <div className="w-screen min-h-full bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>

      </Routes>
    </div>
  );
}

export default App;
