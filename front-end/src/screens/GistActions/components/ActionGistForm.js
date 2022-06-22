import React from "react";

const ActionGistForm = ({
  description,
  handleChange,
  fileName,
  fileContent,
}) => {
  return (
    <div className="add-form">
      <div className="description">
        <input
          name="description"
          placeholder="Enter gist description..."
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="filename">
        <input
          name="fileName"
          placeholder="Enter file name..."
          value={fileName}
          onChange={handleChange}
        />
      </div>
      <div className="filecontent">
        <textarea
          name="fileContent"
          placeholder="Enter file content..."
          rows="15"
          cols="130"
          value={fileContent}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ActionGistForm;
