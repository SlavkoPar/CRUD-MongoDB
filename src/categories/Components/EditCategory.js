//import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CategoryActionTypes, useCategoryContext, useCategoryDispatch } from '../CategoryProvider'

import CategoryForm from "./CategoryForm";

const EditCategory = () => {

    //const { id } = useParams();

    const { store, getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();
    
    const url = `http://localhost:4000/students/update-student/${store._id}`;

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        rollno: "",
    });

    const onSubmit = (studentObject) => {
        axios
            .put(url, studentObject)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Category successfully updated");
                    getCategories()
                    //props.history.push("/student-list");
                } 
                else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
        dispatch({ type: CategoryActionTypes.CLOSE_FORM })
    };

    // Load data from server and reinitialize student form
    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                const { name, email, rollno } = res.data;
                setFormValues({ name, email, rollno });
            })
            .catch((err) => console.log(err));
    }, [url]);

    // Return student form
    return (
        <CategoryForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Student
        </CategoryForm>
    );
};

// Export EditStudent Component
export default EditCategory;
