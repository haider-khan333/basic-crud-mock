import * as React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://63ecae31be929df00cafceb5.mockapi.io/users")
      .then((response) => response.json())
      .then((data) => {
        setData(
          data.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      });
  }, [searchQuery]);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Peeps</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/add">Add User</Nav.Link>
            

            <NavDropdown title="My Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/myprofile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/editprofile">Edit Details</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/login"
                onClick={() => {
                  //clear the local storage
                  localStorage.clear();
                  localStorage.removeItem("userID");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleSearch}
              value={searchQuery}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
