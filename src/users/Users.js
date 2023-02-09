import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Provider, useUserContext, FORM_MODES } from "./Provider";

import List from "./Components/List";
import Add from "./Components/Add";
import Edit from "./Components/Edit";

const Providered = () => {
    const { store } = useUserContext();
    return (
        <Container>
            <Row>
                <Col lg={6}>
                    <List />
                </Col>
                <Col lg={6}>
                    {store.mode === FORM_MODES.ADD && <Add />}
                    {store.mode === FORM_MODES.EDIT && <Edit />}
                </Col>
            </Row>
        </Container>
    );
};

const Users = () => {
    return (
        <Provider>
            <Providered />
        </Provider>
    )
}

export default Users;
