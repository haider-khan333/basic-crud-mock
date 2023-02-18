import logo from './logo.svg';
import './App.css';
import {Button}  from 'react-bootstrap';
import NavBar from './Components/NavBar';
import AddUser from './Components/AddUser';
import UserList from './Components/UserList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditUser from './Components/EditUser';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyProfile from './Components/MyProfile';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser  />} />
        <Route path="/myprofile" element={<MyProfile  />} />
      </Routes>
    </Router>
  );
}

export default App;
