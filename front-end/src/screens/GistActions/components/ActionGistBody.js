import React from "react";
import ActionGistForm from "./ActionGistForm";
import ActionGistSubmit from "./ActionGistSubmit";

const ActionGistBody = ({
  handleSubmit,
  description,
  fileName,
  fileContent,
  handleChange,
  buttonText,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="create-gist-file-container">
        <ActionGistForm
          description={description}
          handleChange={handleChange}
          fileName={fileName}
          fileContent={fileContent}
        />
        <ActionGistSubmit buttonText={buttonText} />
      </div>
    </form>
  );
};

export default ActionGistBody;
