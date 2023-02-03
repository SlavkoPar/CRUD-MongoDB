import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import { CategoryActionTypes, useCategoryContext, useCategoryDispatch } from "../CategoryProvider";

const CategoryList = () => {
    const { store, getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();
    useEffect(() => {
        getCategories();
    }, [getCategories]);
    console.log('RENDERING CategoryList')

    const add = () => {
        dispatch({ type: CategoryActionTypes.ADD })
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
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {store.categories.map((category, i) => <CategoryRow category={category} key={category._id} />)}
                </tbody>
            </Table>
            {store.loading && "Loading"}
            {store.error && store.error}
        </div>
    );
};

export default CategoryList;
