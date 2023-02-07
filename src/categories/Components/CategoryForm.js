import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button, CloseButton } from "react-bootstrap";
import { ActionTypes, useCategoryDispatch } from "../Provider";

const CategoryForm = (props) => {

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
      <CloseButton onClick={closeForm} />
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

          {props.isEdit &&
            <>
              <FormGroup>
                <label htmlFor="created">Created</label>
                <Field name="created" type="text" className="form-control" readOnly />
                {/* <ErrorMessage
                  name="created"
                  className="d-block invalid-feedback"
                  component="span"
                /> */}
              </FormGroup>
              <FormGroup>
                <label htmlFor="createdBy_userName">Created by</label>
                <Field name="createdBy_userName" type="text" className="form-control" readOnly />
              </FormGroup>
            </>
          }

          {props.isEdit && props.initialValues.modified &&
            <>
              <FormGroup>
                <label htmlFor="modified">Modified</label>
                <Field name="modified" type="text" className="form-control" readOnly />
              </FormGroup>
              <FormGroup>
                <label htmlFor="modifiedBy_userName">Modified by</label>
                <Field name="modifiedBy_userName" type="text" className="form-control" readOnly />
              </FormGroup>
            </>
          }

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

export default CategoryForm;