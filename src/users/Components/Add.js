import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ActionTypes, useUserContext, useUserDispatch } from '../Provider'

import UserForm from "./UserForm";

const Add = () => {
    const [formValues, setFormValues] = useState({ name: '', created: null, modified: null })
    
    const { getUsers } = useUserContext();
    const dispatch = useUserDispatch();

    const onSubmit = userObject => {
        userObject.created = new Date().toISOString();
        axios
            .post(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/users/create-user`, userObject)
            .then(res => {
                if (res.status === 200) {
                    console.log('User successfully created')
                    getUsers()
                }
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
            dispatch({ type: ActionTypes.CLOSE_FORM })
    }

    return (
        <UserForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Create User
        </UserForm>
    )
}

export default Add
