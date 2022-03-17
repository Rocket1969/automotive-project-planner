import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.component";
import Register from "./components/Register.component";
import ResetPassword from "./components/ResetPassword.component";
import Dashboard from "./components/Dashboard.component";
import UpdateProfile from "./components/UpdateProfile.component";
import AddProject from "./components/Add Project/Add-Project.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/reset" element={<ResetPassword/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/update-profile" element={<UpdateProfile/>} />
          <Route path="/add-project" element={<AddProject/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
