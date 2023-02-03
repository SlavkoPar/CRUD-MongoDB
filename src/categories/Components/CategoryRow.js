import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import { CategoryActionTypes, useCategoryDispatch } from '../CategoryProvider'

const CategoryRow = ({category}) => {
    const { _id, name, email, rollno } = category;

    const deleteStudent = () => {
        axios
            .delete("http://localhost:4000/students/delete-student/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully deleted");
                    // window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };
   
    const dispatch = useCategoryDispatch();
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{rollno}</td>
            <td>
                {/* <Button size="sm" className="ms-2" onClick={() => dispatch({ type: 'EDIT_STUDENT', _id })}> */}
                <Button size="sm" className="ms-2" 
                    onClick={() => { 
                        dispatch({ type: CategoryActionTypes.EDIT, _id })}
                }>
                Edit
                </Button>
                <Button 
                    onClick={deleteStudent} size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default CategoryRow;
