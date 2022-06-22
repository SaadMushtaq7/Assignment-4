import React from "react";
import { isSomething } from "../../../services/isSomething";
import Spinner from "../../../components/Spinner";
import GistHeader from "./GistHeader";
import GistBody from "./GistBody";

const GistCard = ({
  file,
  filename,
  time,
  index,
  handleDeleteGist,
  rawFiles,
  rawError,
  filesType,
}) => {
  return (
    <div className="single-files">
      <GistHeader
        file={file}
        filename={filename}
        time={time}
        index={index}
        handleDeleteGist={handleDeleteGist}
        filesType={filesType}
      />
      <div className="body">
        {isSomething(rawFiles) && (
          <GistBody rawFiles={rawFiles} index={index} />
        )}
        {!isSomething(rawFiles) && <Spinner error={rawError} />}
      </div>
    </div>
  );
};

export default GistCard;
