
import React from "react";

import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";

// Import Custom CSS
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Categories from "./categories/Categories"
import Users from "./users/Users"

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/categories"} className="nav-link">
                  Categories
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/categories"} className="nav-link">
                    Categories
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/users"} className="nav-link">
                    Users
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
                  <Route exact path="/" element={<Categories />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/users" element={<Users />} />
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
