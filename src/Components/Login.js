//create a login component using bootstrap where the user can login using his email and password. if the email and password are correct, the user will be redirected to the home page. if the email and password are incorrect, the user will be redirected to the login page. The email and password are authenticated by the data from the mock api
//
//
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardLink,
} from "mdb-react-ui-kit";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
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

  const loginUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    //get the current user id
    

    //find the user by email
    const user = data.find((user) => user.email === formData.get("email"));
    console.log(user)
    //if the user exists and the password is correct, redirect to the home page
    if (user && user.email === formData.get("email") && user.password === formData.get("password")) {

      const id = data.find((user) => user.email === formData.get("email")).id;

        //clear the local storage
        localStorage.clear();
        localStorage.setItem("userID", id);

      navigate("/peeps");
    } else if (!user || user.password !== formData.get("password")) {
      alert("Incorrect email or password");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={loginUser} style={{ minHeight:"100%" }}>
      <MDBContainer fluid className="mdb-container">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                <p className="text-black-50 mb-3">
                  Please enter your login and password!
                </p>

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
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  name="password"
                  required
                />

                <MDBCardLink
                  href="/forgetpassword"
                  className="text-center mb-3"
                  style={{ color: "#3f51b5" }}
                >
                  Forgot password?
                </MDBCardLink>
                <hr className="my-4" />
                <MDBBtn size="lg" color="success">
                  Login
                </MDBBtn>

                <p className="text-center mt-3 mb-3">New Here? Lets Sign UP</p>
                <MDBBtn size="lg" onClick={() => navigate("/signup")}>
                  SignUp
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default Login;
