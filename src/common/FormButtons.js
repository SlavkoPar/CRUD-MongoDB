import React from "react";
import { Button } from "react-bootstrap";

export const FormButtons = ({closeForm, title}) => {
  return (
    <>
      <Button variant="danger" size="sm" onClick={closeForm} block="block" type="button">
        Cancel
      </Button>

      &nbsp;

      <Button variant="primary" size="sm" block="block" type="submit">
        {title}
      </Button>
    </>
  );
};
