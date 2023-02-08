import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, CloseButton } from "react-bootstrap";

import { CreatedModifiedForm } from "../../common/CreateModifiedForm"
import { FormButtons } from "../../common/FormButtons"

import { ActionTypes, useUserDispatch } from "../Provider";

const UserForm = (props) => {

  const dispatch = useUserDispatch();

  const closeForm = () => {
    dispatch({ type: ActionTypes.CLOSE_FORM })
  }

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Required"),
    role: Yup.string().required("Required")
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
      <CloseButton onClick={closeForm} />
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label htmlFor="userName" className="form-label">Name</label>
            <Field name="userName" type="text" className="form-control" />
            <ErrorMessage
              name="userName"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="role" className="form-label">Role</label>
            <Field name="role" type="text" className="form-control" />
            <ErrorMessage
              name="role"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          {props.isEdit && <CreatedModifiedForm modified={props.initialValues.modified} /> }
          <FormButtons closeForm={closeForm} title={props.children} />

        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;