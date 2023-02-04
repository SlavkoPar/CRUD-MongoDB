import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button, CloseButton } from "react-bootstrap";
import { ActionTypes, useUserDispatch } from "../Provider";
  
const UserForm = (props) => {

  const dispatch = useUserDispatch();

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
      <CloseButton onClick={closeForm}/>
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="created">Created</label>
            <Field name="created" type="text" className="form-control" />
            <ErrorMessage
              name="created"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="modified">Modified</label>
            <Field name="modified" type="number" className="form-control" />
            <ErrorMessage
              name="modified"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <Button variant="danger" size="sm" onClick={closeForm}
            block="block" type="button">
            Cancel
          </Button>

          <Button variant="primary" size="sm" 
            block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
  
export default UserForm;