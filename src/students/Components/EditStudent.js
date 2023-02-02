//import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";


const EditStudent = ({setMode, _id}) => {

    //const { id } = useParams();
    
    const url = `http://localhost:4000/students/update-student/${_id}`;

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        rollno: "",
    });

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
            setMode={setMode}
        >
            Update Student
        </StudentForm>
    );
};

// Export EditStudent Component
export default EditStudent;
