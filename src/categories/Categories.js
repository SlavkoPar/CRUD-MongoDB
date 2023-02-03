import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { CategoryActionTypes, useCategoryContext, useCategoryDispatch } from "./CategoryProvider";

import CategoryList from "./Components/CategoryList";
import AddCategory from "./Components/AddCategory";
import EditCategory from "./Components/EditCategory";

const Categories = () => {
    const { store } = useCategoryContext();
    return (
        <Container>
            <Row>
                <Col lg={6}>
                    <CategoryList />
                </Col>
                <Col lg={6}>
                    {store.mode === 'add' && <AddCategory />}
                    {store.mode === 'edit' && <EditCategory />}
                </Col>
            </Row>
        </Container>
    );
};

export default Categories;
