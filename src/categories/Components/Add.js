import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'


import CategoryForm from "./CategoryForm";

const Add = () => {
    const [formValues, setFormValues] = useState({ name: '', created: null, modified: null })
    
    const { getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    const onSubmit = categoryObject => {
        categoryObject.created = new Date().toISOString();
        axios
            .post('http://localhost:4000/categories/create-category', categoryObject)
            .then(res => {
                if (res.status === 200) {
                    console.log('Category successfully created')
                    getCategories()
                }
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
            dispatch({ type: ActionTypes.CLOSE_FORM })
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

export default Add
