//create a component where the id fo a user will be passed as a prop and the details of that user will be displayed on specified text boxes. then the client can edit those details and save it


import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
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
        navigate("/");
        } catch (error) {
        console.error(error);
        }
    };
    
    return (
        <div className="container mt-5">
            <h2>Edit User Details</h2>
        <Form onSubmit={editUser}>
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
    
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Designation</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter designation"
                value={designation}
                name="designation"
                onChange={(e) => setDesignation(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Label>Salary</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter salary"
                value={salary}
                name="salary"
                onChange={(e) => setSalary(e.target.value)}
            />
            </Form.Group>

            <br />
            <Button variant="primary" type="submit">
            Edit
            </Button>
        </Form>
        </div>
    );
};

export default EditUser;