import React from "react";

const ActionGistSubmit = ({ buttonText }) => {
  return (
    <div className="btn-action">
      <button className="btn btn-success">Add File</button>
      <button type="submit" className="btn btn-success">
        {buttonText}
      </button>
    </div>
  );
};

export default ActionGistSubmit;
