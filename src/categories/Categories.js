import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Provider, ActionTypes, useCategoryContext, useCategoryDispatch } from "./Provider";

import List from "./Components/List";
import Add from "./Components/Add";
import Edit from "./Components/Edit";

const Providered = () => {
    const { store } = useCategoryContext();
    return (
        <Container>
            <Row>
                <Col lg={6}>
                    <List />
                </Col>
                <Col lg={6}>
                    {store.mode === 'add' && <Add />}
                    {store.mode === 'edit' && <Edit />}
                </Col>
            </Row>
        </Container>
    );
};

const Categories = () => {
    return (
        <Provider>
            <Providered />
        </Provider>
    )
}

export default Categories;
