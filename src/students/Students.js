import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useStore } from "../StoreProvider";
import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";
import EditStudent from "./Components/EditStudent";

const Students = () => {
    const [mode, setMode] = useState(null);
    const [id, setId] = useState(null);
    
    //const store = useStore();
    //const { students } = store;
    return (
        <Container>
            <Row>
                <Col lg={6}>
                    <StudentList setMode={setMode} setId={setId} />
                </Col>
                <Col lg={6}>
                    {mode === 'add' && <AddStudent setMode={setMode} />}
                    {mode === 'edit' && <EditStudent setMode={setMode} _id={id} />}
                </Col>
            </Row>
        </Container>
    );
};

export default Students;
