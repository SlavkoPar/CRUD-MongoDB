import React, { useState, useEffect } from "react";
import axios from 'axios';
import { hostPort, ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'
import { useGlobalStore } from '../../GlobalStoreProvider'

import CategoryForm from "./CategoryForm";

const Add = () => {
    const globalStore = useGlobalStore();
    const [formValues, setFormValues] = useState({ 
        name: '', 
        modified: null,
        modifiedBy: null,
        created: null,
        createdBy: globalStore.user.userId
    })
    
    const { store, getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    const onSubmit = categoryObject => {
        const object = {
            ...categoryObject,
            created: new Date(),
            createdBy: globalStore.user.userId
        }
           
        axios
            .post(`${hostPort}/categories/create-category`, object)
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
        <CategoryForm
            initialValues={formValues}
            isEdit={false}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Create Category
        </CategoryForm>
    )
}

export default Add
