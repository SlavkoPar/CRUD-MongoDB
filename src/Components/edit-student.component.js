// EditStudent Component for update student data

// Import Modules
import { useParams } from 'react-router-dom' // useRouteMatch
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";

// EditStudent Component
const EditStudent = (props) => {

    const { id } = useParams();
    const url = `http://localhost:4000/students/update-student/${id}`;

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        rollno: "",
    });

    //onSubmit handler
    const onSubmit = (studentObject) => {
        axios
            .put(url, studentObject)
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully updated");
                    //props.history.push("/student-list");
                } 
                else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    // Load data from server and reinitialize student form
    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                const { name, email, rollno } = res.data;
                setFormValues({ name, email, rollno });
            })
            .catch((err) => console.log(err));
    }, [url]);

    // Return student form
    return (
        <StudentForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Student
        </StudentForm>
    );
};

// Export EditStudent Component
export default EditStudent;
