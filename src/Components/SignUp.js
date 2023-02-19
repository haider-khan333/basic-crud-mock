import React from "react";
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
} from "mdb-react-ui-kit";

function SignUp() {
  const navigate = useNavigate();
  
  const signup = async (event) => {
    let flag = true;
    event.preventDefault();
    const formData = new FormData(event.target);
    const requestBody = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      designation: formData.get("designation"),
      salary: formData.get("salary"),
    };

    if(formData.get("password") !== formData.get("confirmPassword")){
        alert("Password and Confirm Password should be same");
        flag = false;
        
        
    }else if(formData.get("name") === "" || formData.get("email") === "" || formData.get("password") === "" || formData.get("confirmPassword") === "" || formData.get("designation") === "" || formData.get("salary") === ""){
        alert("Please fill all the fields");
        flag = false;
    }


    if(flag){
        try {
            const response = await fetch(
              "https://63ecae31be929df00cafceb5.mockapi.io/admin",
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
            alert("Admin Created Successfully");
            navigate("/login");
          } catch (error) {
            console.error(error);
          }

    }
    
  };

  return (
    <form onSubmit={signup}>
      <MDBContainer fluid className="mdb-container">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                <p className="text-black-50 mb-3">
                  Enter your details to register your account
                </p>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Name"
                  id="formControlLg"
                  type="name"
                  name="name"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  name="email"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  name="password"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Confirm Password"
                  id="formControlLg"
                  type="password"
                  name="confirmPassword"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Designation"
                  id="formControlLg"
                  type="designation"
                  name="designation"
                  size="lg"
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Salary"
                  id="formControlLg"
                  type="number"
                  name="salary"
                  size="lg"
                />

                <hr className="my-4" />
                <MDBBtn size="lg" color="success">
                  Sign Up
                </MDBBtn>

                <p className="text-center mt-3 mb-3">
                  Already have an Account?
                </p>
                <MDBBtn size="lg" onClick={() => navigate("/login")}>
                  Login
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default SignUp;
