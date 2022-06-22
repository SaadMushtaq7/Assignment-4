import React from "react";

const GistBody = ({ rawFiles, index }) => {
  return (
    <textarea rows="12" cols="90" value={rawFiles[index]} disabled={true} />
  );
};

export default GistBody;
