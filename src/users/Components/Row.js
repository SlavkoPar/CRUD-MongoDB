import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import { hostPort, ActionTypes, useUserContext, useUserDispatch } from '../Provider'

const Row = ({user}) => {
    const { _id, userName } = user;
    const { getUsers } = useUserContext();

    const deleteUser = () => {
        axios
            .delete(`${hostPort}/users/delete-user/${_id}`)
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
            <td>{userName}</td>
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
