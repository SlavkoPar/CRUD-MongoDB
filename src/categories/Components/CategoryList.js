import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import { CategoryActionTypes, useCategoryContext, useCategoryDispatch } from "../CategoryProvider";

const CategoryList = () => {
    //const [page, setPage] = useState(1);
    const { store, getCategories } = useCategoryContext();
    // const [categories, setCategories] = useState([]);
    const dispatch = useCategoryDispatch();
    // const url = "http://localhost:4000/students/"
    useEffect(() => {
        getCategories();
    }, [getCategories]);
    console.log('RENDERING StudentList')

    const add = () => {
        dispatch({ type: CategoryActionTypes.ADD })
    }

    return (
        <div className="table-wrapper">
            <Button variant="secondary" size="sm" onClick={add}
                block="block" type="button">
                Add Student
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
