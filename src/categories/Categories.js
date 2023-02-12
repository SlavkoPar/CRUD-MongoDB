import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useGlobalStore } from '../GlobalStoreProvider'
import { Provider, useCategoryContext, FORM_MODES, ActionTypes, useCategoryDispatch, initialCategory } from "./Provider";

import TreeView from "./Components/TreeView";
// import Add from "./Components/Add";
import Edit from "./Components/Edit";

const Providered = () => {

    const globalStore = useGlobalStore();
    const { store } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    return (
        <>
            <Button variant="secondary" size="sm" block="block" type="button"
                onClick={() => dispatch({ 
                        type: ActionTypes.ADD,
                        category: {
                            _id: null,
                            level: 0
                        }, 
                        createdBy: globalStore.user.userId 
                    })
                }
            >
                Add Category
            </Button>
            <Container>
                <Row>
                    <Col sm={12} lg={6}>
                        <div>
                            <TreeView parentCategory={null} level={1} />
                        </div>
                    </Col>
                    <Col sm={0} lg={6}> {/* className="d-none d-lg-block"> */}
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
