//import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostPort, ActionTypes, useUserContext, useUserDispatch } from '../Provider'

import UserForm from "./UserForm";
import { ROLES } from "../../GlobalStoreProvider";

const Edit = () => {

    //const { id } = useParams();

    const { store, getUsers } = useUserContext();
    const dispatch = useUserDispatch();

    const url = `${hostPort}/users/update-user/${store.user._id}`;

    const [formValues, setFormValues] = useState({
        userName: "",
        role: ROLES.VIEWER,
        created: "",
        modified: "",
        createdBy_userName: "",
        modifiedBy_userName: ""
    });

    const formatDate = (date) => date
        ? new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()
        : "";

    const onSubmit = (userObject) => {
        axios
            .put(url, userObject)
            .then((res) => {
                if (res.status === 200) {
                    console.log("User successfully updated");
                    getUsers()
                }
                else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
        dispatch({ type: ActionTypes.CLOSE_FORM })
    };

    // Load data from server and reinitialize user form
    useEffect(() => {
        axios
            .get(`${hostPort}/users/${store.user._id}`)
            .then(({ data }) => {
                data.created = formatDate(data.created)
                data.modified = formatDate(data.modified)
                setFormValues(data);
            })
            .catch((err) => console.log(err));
    }, [store.user._id]);

    return (
        <UserForm
            initialValues={formValues}
            isEdit={true}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update User
        </UserForm>
    );
};

export default Edit;
