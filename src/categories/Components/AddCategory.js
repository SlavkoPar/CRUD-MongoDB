import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CategoryActionTypes, useCategoryContext, useCategoryDispatch } from '../CategoryProvider'


import CategoryForm from "./CategoryForm";

const AddCategory = () => {
    const [formValues, setFormValues] = useState({ name: '', email: '', rollno: '' })
    
    const { getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    const onSubmit = categoryObject => {
        axios
            .post('http://localhost:4000/students/create-student', categoryObject)
            .then(res => {
                if (res.status === 200) {
                    console.log('Category successfully created')
                    getCategories()
                }
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
            dispatch({ type: CategoryActionTypes.CLOSE_FORM })
    }

    return (
        <CategoryForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Create Category
        </CategoryForm>
    )
}

export default AddCategory
