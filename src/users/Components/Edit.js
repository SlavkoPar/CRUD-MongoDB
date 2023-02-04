//import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ActionTypes, useUserContext, useUserDispatch } from '../Provider'

import UserForm from "./UserForm";

const Edit = () => {

    //const { id } = useParams();

    const { store, getUsers } = useUserContext();
    const dispatch = useUserDispatch();
    
    const url = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/users/update-user/${store._id}`;

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        rollno: "",
    });

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
        <UserForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update User
        </UserForm>
    );
};

export default Edit;
