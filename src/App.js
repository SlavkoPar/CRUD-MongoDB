// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import {
  BrowserRouter as Router, Routes,
  Route, Link
} from "react-router-dom";

// Import other React Component
import Students from "./students/Students";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/students"}
                  className="nav-link">
                  Students
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                {/* <Nav>
                  <Link to={"/create-student"}
                    className="nav-link">
                    Create Student
                  </Link>
                </Nav> */}

                <Nav>
                  <Link to={"/students"}
                    className="nav-link">
                    Students
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<Students/>} />
                  <Route path="/students" element={<Students />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
