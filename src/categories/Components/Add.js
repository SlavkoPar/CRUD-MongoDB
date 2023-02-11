import React, { useState, useEffect } from "react";
import axios from 'axios';
import { hostPort, ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'
import { useGlobalStore } from '../../GlobalStoreProvider'

import CategoryForm from "./CategoryForm";
import InLineCategoryForm from "./InLineCategoryForm";

const Add = ({ category, inLine }) => {
    const globalStore = useGlobalStore();

    const [formValues, setFormValues] = useState(category)

    const { store, getSubCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    const onSubmit = categoryObject => {
        delete categoryObject._id;
        const object = {
            ...categoryObject,
            created: new Date(),
            createdBy: globalStore.user.userId
        }

        axios
            .post(`${hostPort}/categories/create-category`, object)
            .then(({status, data}) => {
                if (status === 200) {
                    console.log('Category successfully created')
                    // getSubCategories(parentCategory)
                    //refreshAddedCategory(res.data)
                    dispatch({ type: ActionTypes.REFRESH_ADDED_CATEGORY, data });
                }
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
        dispatch({ type: ActionTypes.CLOSE_FORM })
    }

    return (
        <>
            {inLine ?
                <InLineCategoryForm
                    initialValues={formValues}
                    isEdit={false}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    Add
                </InLineCategoryForm>
                :
                <CategoryForm
                    initialValues={formValues}
                    isEdit={false}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    Create Category
                </CategoryForm >
            }
        </>
    )
}

export default Add
