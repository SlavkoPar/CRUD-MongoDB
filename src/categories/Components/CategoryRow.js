import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faEdit, faCaretRight, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons'

import { Button } from "react-bootstrap";
import axios from "axios";

import { useGlobalStore } from '../../GlobalStoreProvider'
import { hostPort, ActionTypes, FORM_MODES, useCategoryContext, useCategoryDispatch } from '../Provider'
import TreeView from "./TreeView";
import Add from "./Add";
import Edit from "./Edit";

const CategoryRow = ({ category }) => {
    const { _id, name, level, inEditing, inAdding } = category;

    const globalStore = useGlobalStore();
    const { store } = useCategoryContext();
    const dispatch = useCategoryDispatch();

    const [isExpanded, setIsExpanded] = useState(false);

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
        const refresh = isExpanded;
        setIsExpanded(!isExpanded);
        if (refresh)
            dispatch({ type: ActionTypes.CLEAN_SUB_TREE, category })
    }
    console.log({ inEditing, isExpanded, inAdding })

    return (
        <>
            {inAdding ? (
                <Add category={category} inLine={true} />
            )
                : (
                    <tr>
                        <td>
                            <FontAwesomeIcon color='orange' size='lg'
                                icon={isExpanded ? faCaretDown : faCaretRight}
                                onClick={expand}
                            />
                        </td>
                        <td title={_id} >{name}</td>
                        <td>{level} </td>
                        <td>
                            <div className="my-0 py-0" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button size="sm" className="ms-2"
                                    onClick={() => { dispatch({ type: ActionTypes.EDIT, category }) }}>
                                    Edit
                                </Button>
                                <Button
                                    onClick={deleteCategory} size="sm" className="ms-2" variant="danger">
                                    Delete
                                </Button>
                                <Button size="sm" className="ms-2" title="Add SubCategory" >
                                    <FontAwesomeIcon icon={faPlus} color='orange' size='sm'
                                        onClick={() => {
                                            dispatch({
                                                type: ActionTypes.ADD,
                                                category,
                                                createdBy: globalStore.user.userId
                                            })
                                            if (!isExpanded)
                                                setIsExpanded(true)
                                        }}
                                    />
                                </Button>
                            </div>
                        </td>
                    </tr>
                )
            }

            {(isExpanded || inEditing) && !inAdding &&
                <tr>
                    <td colSpan={5} className="px-0 py-0">
                        {inEditing ? (
                            // <div class="d-lg-none">hide on lg and wider screens</div>
                            <div className="mx-3 d-md-none">
                                <Edit category={category} inLine={true} />
                            </div>
                        )
                            : (
                                <TreeView level={level + 1} parentCategory={_id} />
                            )}
                    </td>
                </tr>
            }
        </>
    );
};

export default CategoryRow;
