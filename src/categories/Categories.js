import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useGlobalStore } from '../GlobalStoreProvider'
import { Provider, useCategoryContext, FORM_MODES, ActionTypes, useCategoryDispatch, initialCategory } from "./Provider";

import TreeView from "./Components/TreeView";
import Add from "./Components/Add";
//import AddSubCategory from "./Components/AddSubCategory";
import Edit from "./Components/Edit";

const Providered = () => {

    const globalStore = useGlobalStore();
    const { store } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    console.log({ store })
    const category = store.subCategories.find(c => c.inAdding);
    return (
        <>
            <Button variant="secondary" size="sm" block="block" type="button"
                onClick={() => dispatch({ 
                        type: ActionTypes.ADD, 
                        createdBy: globalStore.user.userId 
                    })
                }
            >
                Add Category
            </Button>
            <Container>
                <Row>
                    <Col lg={7}>
                        <TreeView parentCategory={null} level={1} />
                    </Col>
                    <Col lg={5}>
                        {/* {store.mode === FORM_MODES.ADD && <Add category={category??initialCategory} />} */}
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
