import React, { useState, useEffect } from "react";
import axios from 'axios';
import { hostPort, ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'
import { useGlobalStore } from '../../GlobalStoreProvider'

import SubCategoryForm from "./SubCategoryForm";

const AddSubCategory = () => {
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

    const onSubmit = subCategoryObject => {
        const object = {
            parentCategory: store.category._id,
            level: store.category.level + 1,
            ...subCategoryObject,
            created: new Date(),
            createdBy: globalStore.user.userId
        }
           
        axios
            .post(`${hostPort}/categories/create-subcategory`, object)
            .then(res => {
                if (res.status === 200) {
                    console.log('SubCategory successfully created')
                    // getCategories()
                }
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
            dispatch({ type: ActionTypes.CLOSE_FORM })
    }

    return (
        <SubCategoryForm
            category={store.category}
            initialValues={formValues}
            isEdit={false}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Create SubCategory
        </SubCategoryForm>
    )
}

export default AddSubCategory
