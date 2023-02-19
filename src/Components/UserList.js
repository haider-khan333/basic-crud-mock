//using bootstrap, show all the users in a table and also add a button to delete and edit the user

import React, { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "./Spinner";

// import users from "../Models/User";

const UserList = () => {
  const navigate = useNavigate();

  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://63ecae31be929df00cafceb5.mockapi.io/users"
      );
      const data = await response.json();
      setUsersList(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const deleteUser = (id) => {
    fetch(`https://63ecae31be929df00cafceb5.mockapi.io/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsersList(usersList.filter((user) => user.id !== id));
    });
  };

  if (loading) {
    return (
        <CustomSpinner/>
    );
  }
  return (
    <div style={{ minHeight:"100%" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.designation}</td>
              <td>{user.salary}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    navigate(`/edit/${user.id}`);
                  }}
                >
                  Edit
                </Button>
                <span> </span>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
