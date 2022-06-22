import React from "react";

const TdData = ({ data, componentClass = "" }) => {
  return <td className={componentClass}>{data}</td>;
};

export default TdData;
