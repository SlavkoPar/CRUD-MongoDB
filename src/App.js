
import React from "react";

import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import {
  BrowserRouter as Router, Routes,
  Route, Link
} from "react-router-dom";

// Import other React Component
import { CategoryProvider } from "./categories/CategoryProvider";
import Categories from "./categories/Categories"

// App Component
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
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<CategoryProvider><Categories /></CategoryProvider>} />
                  <Route path="/categories" element={<CategoryProvider><Categories /></CategoryProvider>} />
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
