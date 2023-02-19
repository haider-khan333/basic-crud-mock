//using bootstrap, create a form where one can add a user. When the submit button is clicked, the details are then added to the user array

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput,MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
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
    <form onSubmit={addUser} style={{ minHeight:"100%" }}>
      <MDBContainer fluid className="mdb-container">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "60%" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-5">
                  Add user details  
                </h2>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Name"
                  id="formControlLg"
                  type="name"
                  name="name"
                  size="lg"
                  required
                  onChange={(e) => setName(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  name="email"
                  size="lg"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Designation"
                  id="formControlLg"
                  type="designation"
                  name="designation"
                  size="lg"
                  required
                  onChange={(e) => setDesignation(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Salary"
                  id="formControlLg"
                  type="number"
                  name="salary"
                  size="lg"
                  required
                  onChange={(e) => setSalary(e.target.value)}
                />
                <MDBBtn size="lg" color="success">
                  Add
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default AddUser;
