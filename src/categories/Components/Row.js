import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import { ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'

const Row = ({category}) => {
    const { _id, name, email, rollno } = category;
    const { getCategories } = useCategoryContext();

    const deleteCategory = () => {
        axios
            .delete("http://localhost:4000/categories/delete-category/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Category successfully deleted");
                    getCategories()
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };
   
    const dispatch = useCategoryDispatch();
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
                    onClick={deleteCategory} size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default Row;
