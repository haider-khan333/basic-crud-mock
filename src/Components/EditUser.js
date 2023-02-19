//create a component where the id fo a user will be passed as a prop and the details of that user will be displayed on specified text boxes. then the client can edit those details and save it
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtn,
  } from "mdb-react-ui-kit";
import { useNavigate,useParams } from "react-router-dom";

const EditUser = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [salary, setSalary] = useState("");
    
    const [user, setUser] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        const fetchUser = async () => {
        const response = await fetch(
            `https://63ecae31be929df00cafceb5.mockapi.io/users/${id}`
        );
        const data = await response.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setDesignation(data.designation);
        setSalary(data.salary);

        };
        fetchUser();
    }, [props.id]);
    
    const editUser = async (event) => {
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
            `https://63ecae31be929df00cafceb5.mockapi.io/users/${id}`,
            {
            method: "PUT",
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
        <form onSubmit={editUser} style={{ minHeight:"100%" }}>
        <MDBContainer fluid className="mdb-container">
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "60%" }}
              >
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <h2 className="fw-bold mb-5">
                    Change user details 
                  </h2>
  
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    value={name}
                    label="Name"
                    id="formControlLg"
                    type="name"
                    name="name"
                    size="lg"
                    onChange={(e) => setName(e.target.value)}
                  />
  
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    name="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
  
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Designation"
                    id="formControlLg"
                    type="designation"
                    name="designation"
                    size="lg"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
  
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Salary"
                    id="formControlLg"
                    type="number"
                    name="salary"
                    size="lg"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  <MDBBtn size="lg" color="success">
                    Edit
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    );
};

export default EditUser;