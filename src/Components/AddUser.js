//using bootstrap, create a form where one can add a user. When the submit button is clicked, the details are then added to the user array

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");


  const addUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const requestBody = {
      name: formData.get("name"),
      email: formData.get("email"),
      designation: formData.get("designation"),
      salary: formData.get("salary"),
    };

    try {
      const response = await fetch(
        "https://63ecae31be929df00cafceb5.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
        navigate("/peeps");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={addUser}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter designation"
            value={designation}
            name="designation"
            onChange={(e) => setDesignation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter salary"
            value={salary}
            name="salary"
            onChange={(e) => setSalary(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
