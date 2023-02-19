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

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://63ecae31be929df00cafceb5.mockapi.io/admin`
      );
      const data = await response.json();
      setData(data);
    };

    fetchUser();
  }, []);

  const forgotPassword = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    //get the current user id

    //find the user by email
    const user = data.find((user) => user.email === formData.get("email"));

    //if the user exists and the password is correct, redirect to the home page
    if (user && user.email === formData.get("email")) {
      const id = data.find((user) => user.email === formData.get("email")).id;
      await fetch(`https://63ecae31be929df00cafceb5.mockapi.io/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.get("password"),
        }),
      });

      //   //clear the local storage
      //   localStorage.clear();
      //   localStorage.setItem("userID", id);

      alert("Password changed successfully");

      navigate(`/login`);
    } else if (!user || user.password !== formData.get("password")) {
      alert("Incorrect email or password");
    }
  };

  return (
    <form onSubmit={forgotPassword} style={{ minHeight: "100%" }}>
      <MDBContainer fluid className="mdb-container">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "60%" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-5">Change Password</h2>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  name="email"
                  size="lg"
                  required
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="New Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  name="password"
                  required
                />

                <MDBBtn size="lg" color="success">
                  Change Password
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default ForgotPassword;
