import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, CloseButton } from "react-bootstrap";
import { CreatedModifiedForm } from "../../common/CreateModifiedForm"
import { FormButtons } from "../../common/FormButtons"

import { ActionTypes, useCategoryDispatch } from "../Provider";

const SubCategoryForm = (props) => {

  const dispatch = useCategoryDispatch();

  const closeForm = () => {
    dispatch({ type: ActionTypes.CLOSE_FORM })
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    // email: Yup.string()
    //   .email("You have enter an invalid email address")
    //   .required("Required"),
    // rollno: Yup.number()
    //   .positive("Invalid roll number")
    //   .integer("Invalid roll number")
    //   .required("Required"),
  });

  console.log(props);

  return (
    <div className="form-wrapper">
      <CloseButton onClick={closeForm} className="float-end" />
      <label className="form-label">Category: {props.category.name}</label>

      <legend style={{ margin: '0px' }}>SubCategory</legend>
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <fieldset style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px' }}>
            <FormGroup>
              <label className="form-label" htmlFor="name">Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage
                name="name"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>
          </fieldset>
          {props.isEdit && <CreatedModifiedForm modified={props.initialValues.modified} />}
          <FormButtons closeForm={closeForm} title={props.children} />
        </Form>
      </Formik>

    </div>
  );
};

export default SubCategoryForm;