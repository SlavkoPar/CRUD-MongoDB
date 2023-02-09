//import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostPort, ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'
import { useGlobalStore } from '../../GlobalStoreProvider'

import CategoryForm from "./CategoryForm";

const Edit = () => {
    const globalStore = useGlobalStore();
    const { store, getCategories } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    const [formValues, setFormValues] = useState({
        name: "",
        created: "",
        modified: "",
        createdBy_userName: "",
        modifiedBy_userName: ""
    });

    const url = `${hostPort}/categories/update-category/${store.category._id}`
    const onSubmit = (categoryObject) => {
        const object = {
            ...categoryObject,
            modified: new Date(),
            modifiedBy: globalStore.user.userId 
        }
        axios
            .put(url, object)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Category successfully updated");
                    //getCategories();
                } 
                else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
        dispatch({ type: ActionTypes.CLOSE_FORM })
    };

    const formatDate  = (date) => date 
        ? new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString() 
        : "";

    // Load data from server and reinitialize category form
    useEffect(() => {
        axios
            .get(`${hostPort}/categories/get-category/${store.category._id}`)
            .then(({data}) => {
                data.created = formatDate(data.created);
                data.modified = formatDate(data.modified);
                data.modifiedBy_userName = data.modifiedBy_user.userName;
                setFormValues(data);
            })
            .catch((err) => console.log(err));
    }, [store.category._id]);

    return (
        <CategoryForm
            initialValues={formValues}
            isEdit={true}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Category
        </CategoryForm>
    );
};

export default Edit;
