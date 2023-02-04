//import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'

import CategoryForm from "./CategoryForm";

const Edit = () => {

    //const { id } = useParams();

    const { store, getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();
    
    const url = `http://localhost:4000/categories/update-category/${store._id}`;

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        rollno: "",
    });

    const onSubmit = (categoryObject) => {
        axios
            .put(url, categoryObject)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Category successfully updated");
                    getCategories()
                } 
                else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
        dispatch({ type: ActionTypes.CLOSE_FORM })
    };

    // Load data from server and reinitialize category form
    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                let { name, created, modified } = res.data;
                created = new Date(created).toLocaleDateString() + " " + new Date(created).toLocaleTimeString()
                if (modified)
                    modified = new Date(modified).toLocaleDateString() + " " + new Date(created).toLocaleTimeString()
                setFormValues({ name, created, modified });
            })
            .catch((err) => console.log(err));
    }, [url]);

    return (
        <CategoryForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Category
        </CategoryForm>
    );
};

export default Edit;
