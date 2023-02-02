import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import StudentRow from "./StudentRow";

const StudentList = ({ setMode, setId }) => {
    const [page, setPage] = useState(1);
    const [students, setStudents] = useState([]);

    const url = "http://localhost:4000/students/"
    useEffect(() => {
        console.log('FETCHING StudentList')
        axios
            .get(url)
            .then(({ data }) => {
                setStudents(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [url, page]);
    console.log('RENDERING StudentList')

    const add = () => {
        setMode('add')
    }

    return (
        <div className="table-wrapper">
            <Button variant="secondary" size="sm" onClick={add}
                block="block" type="button">
                Add Student
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, i) => <StudentRow student={student} key={i} setMode={setMode} setId={setId} />)}
                </tbody>
            </Table>
        </div>
    );
};

export default StudentList;
