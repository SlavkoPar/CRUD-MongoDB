import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Row from "./Row";
import { ActionTypes, useCategoryContext, useCategoryDispatch } from "../Provider";

const List = () => {
    const { store, getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();
    useEffect(() => {
        getCategories();
    }, [getCategories]);
    console.log('RENDERING CategoryList')

    const add = () => {
        dispatch({ type: ActionTypes.ADD })
    }

    return (
        <div className="table-wrapper">
            <Button variant="secondary" size="sm" onClick={add}
                block="block" type="button">
                Add Category
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Email</th>
                        <th>Roll No</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {store.categories.map((category, i) => <Row category={category} key={category._id} />)}
                </tbody>
            </Table>
            {store.loading && "Loading"}
            {store.error && store.error}
        </div>
    );
};

export default List;
