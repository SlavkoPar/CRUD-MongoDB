import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Provider, useCategoryContext, FORM_MODES, ActionTypes, useCategoryDispatch } from "./Provider";

import TreeView from "./Components/TreeView";
import Add from "./Components/Add";
//import AddSubCategory from "./Components/AddSubCategory";
import Edit from "./Components/Edit";

const Providered = () => {

    const { store } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    console.log({ store })
    return (
        <>
            <Button variant="secondary" size="sm" block="block" type="button"
                onClick={() => dispatch({ type: ActionTypes.ADD })}
            >
                Add Category
            </Button>
            <Container>
                <Row>
                    <Col lg={6}>
                        <TreeView parentCategory={null} level={1} />
                    </Col>
                    <Col lg={6}>
                        {store.mode === FORM_MODES.ADD && <Add />}
                        {/* {store.mode === FORM_MODES.ADD_SUBCATEGORY && <AddSubCategory />} */}
                        {store.mode === FORM_MODES.EDIT && <Edit />}
                    </Col>
                </Row>
            </Container>
        </>
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
