import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import { ActionTypes, useUserContext, useUserDispatch } from '../Provider'

const Row = ({user}) => {
    const { _id, name, email, rollno } = user;
    const { getUsers } = useUserContext();

    const deleteUser = () => {
        axios
            .delete(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/users/delete-user/${_id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("User successfully deleted");
                    getUsers()
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };
   
    const dispatch = useUserDispatch();
    return (
        <tr>
            <td>{name}</td>
            {/* <td>{email}</td>
            <td>{rollno}</td> */}
            <td>
                <Button size="sm" className="ms-2" 
                    onClick={() => { 
                        dispatch({ type: ActionTypes.EDIT, _id })}
                }>
                Edit
                </Button>
                <Button 
                    onClick={deleteUser} size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default Row;
