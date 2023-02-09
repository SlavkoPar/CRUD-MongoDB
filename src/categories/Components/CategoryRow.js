import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faEdit, faCaretRight, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons'

import { Button } from "react-bootstrap";
import axios from "axios";

import { hostPort, ActionTypes, useCategoryContext, useCategoryDispatch } from '../Provider'
import TreeView from "./TreeView";

const CategoryRow = ({ category }) => {
    const { _id, name, level } = category;

    const dispatch = useCategoryDispatch();

    const [isExpanded, toggleExpanded] = useState(false);

    const deleteCategory = () => {
        axios
            .delete(`${hostPort}/categories/delete-category/${_id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Category successfully deleted");
                    // getCategories()
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    const expand = () => {
        //const refresh = !isExpanded;
        toggleExpanded(!isExpanded);
        //if (refresh)
        //dispatch({ type: ActionTypes.REMOVE_CHILDREN, category })
    }

    return (
        <>
            <tr>
                <td><FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretRight} color='orange' size='lg' onClick={expand} /></td>
                <td title={_id}>{name}<div>{_id}</div></td>
                <td>{level} </td>
                <td>
                    <Button size="sm" className="ms-2"
                        onClick={() => { dispatch({ type: ActionTypes.EDIT, category }) }}>
                        Edit
                    </Button>
                    <Button
                        onClick={deleteCategory} size="sm" variant="danger">
                        Delete
                    </Button>
                    <Button size="sm" className="ms-2" title="Add SubCategory" >
                        <FontAwesomeIcon icon={faPlus} color='orange' size='sm' 
                            onClick={() => {
                                dispatch({ type: ActionTypes.ADD_SUBCATEGORY, category })
                            }} />
                    </Button>
                </td>
            </tr>
            {isExpanded &&
                <tr>
                    <td colSpan={5}>
                        <TreeView level={level+1} parentCategory={_id} />
                    </td>
                </tr>
            }
        </>
    );
};

export default CategoryRow;
