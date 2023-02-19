import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import NavBar from "./Components/NavBar";
import AddUser from "./Components/AddUser";
import UserList from "./Components/UserList";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import EditUser from "./Components/EditUser";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import MyProfile from "./Components/MyProfile";
import EditProfile from "./Components/EditProfile";
import ForgotPassword from "./Components/ForgotPassword";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/peeps" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
