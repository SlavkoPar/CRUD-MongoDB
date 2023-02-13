import React from "react";
import { Button } from "react-bootstrap";

export const FormButtons = ({closeForm, title, inLine, handleSubmit}) => {
  return (
    <div className="my-0" style={{ padding: 0, margin: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
      <Button variant="danger" size="sm" onClick={closeForm} block="block" type="button">
        Cancel
      </Button>

      &nbsp;

      <Button variant="primary" size="sm" block="block" type="button" onClick={handleSubmit}>
        {title}
      </Button>
    </div>
  );
};
