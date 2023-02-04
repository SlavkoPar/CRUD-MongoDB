import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Row from "./Row";
import { ActionTypes, useUserContext, useUserDispatch } from "../Provider";

const List = () => {
    const { store, getUsers } = useUserContext();
    const dispatch = useUserDispatch();
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    console.log('RENDERING UserList')

    const add = () => {
        dispatch({ type: ActionTypes.ADD })
    }

    return (
        <div className="table-wrapper">
            <Button variant="secondary" size="sm" onClick={add}
                block="block" type="button">
                Add User
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Email</th>
                        <th>Roll No</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {store.users.map((user, i) => <Row user={user} key={user._id} />)}
                </tbody>
            </Table>
            {store.loading && "Loading"}
            {store.error && store.error}
        </div>
    );
};

export default List;
