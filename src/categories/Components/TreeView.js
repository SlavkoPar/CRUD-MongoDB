import React, { useState, useEffect } from "react";

import { Table, Button } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import { ActionTypes, useCategoryContext, useCategoryDispatch } from "../Provider";

const TreeView = ({ parentCategory, level }) => {
    const { store, getSubCategories } = useCategoryContext();
    useEffect(() => {
        getSubCategories({ parentCategory, level });
    }, [level, getSubCategories, parentCategory]);
    console.log('RENDERING SubCategories', '[' + store.subCategories.length + ']', level, parentCategory)

    return (
        <div className={`table-wrapper ms-2`}>
            <Table striped bordered hover size="sm" className="mb-0">
                {level === 1 &&
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {
                        store.subCategories
                            .filter(category => 
                                category.parentCategory === parentCategory
                            )
                            .map(category => 
                                <CategoryRow category={category} key={category._id} /> 
                            )
                    }
                </tbody>
            </Table>
            {store.loading && "Loading"}
            {store.error && store.error}
        </div>
    );
};

export default TreeView;
