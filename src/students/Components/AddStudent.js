import React, { useState, useEffect } from "react";
import axios from 'axios';
import StudentForm from "./StudentForm";

const AddStudent = ({setMode}) => {
    const [formValues, setFormValues] =
        useState({ name: '', email: '', rollno: '' })
    // onSubmit handler
    const onSubmit = studentObject => {
        axios
            .post('http://localhost:4000/students/create-student', studentObject)
            .then(res => {
                if (res.status === 200)
                    alert('Student successfully created')
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    }

    // Return student form
    return (
        <StudentForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
            setMode={setMode}
        >
            Create Student
        </StudentForm>
    )
}

export default AddStudent
