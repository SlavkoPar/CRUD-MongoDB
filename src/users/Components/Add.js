import React, { useState, useEffect } from "react";
import axios from 'axios';
import { hostPort, useUserContext, useUserDispatch } from '../Provider'
import { useGlobalStore, ROLES } from '../../GlobalStoreProvider'

import { ActionTypes } from '../Provider'

import UserForm from "./UserForm";

const Add = () => {
    
    const globalStore = useGlobalStore();
    const { getUsers } = useUserContext();
    const dispatch = useUserDispatch();

    const [formValues, setFormValues] = useState({ userName: '', role: ROLES.VIEWER, created: null, modified: null })

    const onSubmit = userObject => {
        const object = {
            ...userObject,
            created: new Date(),
            createdBy: globalStore.user.userId,
            role: 'FIRST_REGISTERED_USER_IS_OWNER'
        }
        axios
            .post(`${hostPort}/users/create-user`, object)
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
        <UserForm 
            initialValues={formValues} 
            isEdit={false}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Create User
        </UserForm>
    )
}

export default Add
