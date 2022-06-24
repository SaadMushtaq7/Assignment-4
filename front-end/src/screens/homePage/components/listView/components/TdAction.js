import React from "react";
import loadingAction from "../../../../../loadingAction.gif";

const TdAction = ({
  loading,
  clickedFile,
  file,
  files, //access directly thorugh redux
  handleAction,
  checkedClass,
  simpleClass,
}) => {
  return (
    <span>
      {loading && clickedFile.id === file.id ? ( //seperate star and fork component
        <img src={loadingAction} alt="loading" />
      ) : (
        <i
          onClick={() => handleAction(file)}
          className={
            files.some((item) => item.id === file.id)
              ? checkedClass
              : simpleClass
          }
        />
      )}
    </span>
  );
};

export default TdAction;
