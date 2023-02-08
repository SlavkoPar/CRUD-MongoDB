import React from "react";
import { Field } from "formik";
import { FormGroup } from "react-bootstrap";

export const CreatedModifiedForm = ({ modified }) => {
  return (
    <>
      <FormGroup>
        <label htmlFor="createdBy_userName" className="form-label">Created by</label>
        <Field name="createdBy_userName" type="text" className="form-control form-control-sm" disabled />
      </FormGroup>

      <FormGroup>
        <label htmlFor="created" className="form-label">Created</label>
        <Field name="created" type="text" className="form-control form-control-sm" disabled />
      </FormGroup>

      {modified &&
        <>
          <FormGroup>
            <label htmlFor="modifiedBy_userName" className="form-label">Modified by</label>
            <Field name="modifiedBy_userName" type="text" className="form-control form-control-sm" disabled />
          </FormGroup>

          <FormGroup>
            <label htmlFor="modified" className="form-label">Modified</label>
            <Field name="modified" type="text" className="form-control form-control-sm" disabled />
          </FormGroup>
        </>
      }

    </>
  );
};
