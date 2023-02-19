import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const id = localStorage.getItem("userID");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://63ecae31be929df00cafceb5.mockapi.io/admin/${id}`
      );
      const data = await response.json();
      setData(data);
      setName(data.name);
      setEmail(data.email);
      setDesignation(data.designation);
      setSalary(data.salary);
    };

    fetchUser();
  }, []);

  const editProfile = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch(
      `https://63ecae31be929df00cafceb5.mockapi.io/admin/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          designation: formData.get("designation"),
          salary: formData.get("salary"),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    alert("Admin details updated successfully");
    navigate("/peeps");
  };

  return (
    <form onSubmit={editProfile} style={{ minHeight:"100%" }}>
      <MDBContainer fluid className="mdb-container">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "60%" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">
                  Change your details
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

export default EditProfile;
