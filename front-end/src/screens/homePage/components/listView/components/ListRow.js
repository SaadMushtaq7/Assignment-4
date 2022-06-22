import React from "react";
import { Link } from "react-router-dom";
import TdAction from "./TdAction";
import TdData from "./TdData";

const ListRow = ({
  file,
  clickedFile,
  starFiles,
  forkFiles,
  avatar,
  username,
  date,
  time,
  starLoading,
  forkLoading,
  handleStar,
  handleGistFork,
}) => {
  return (
    <tr>
      <TdData data={<input type="checkbox" className="checkbox-size" />} />
      <TdData
        data={<img src={avatar} alt="user" />}
        componentClass={"user-img"}
      />
      <TdData data={username} />
      <TdData data={date} />
      <TdData data={time} />
      <TdData data="Web Server" />
      <TdData
        data={
          <h5>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/file"
              state={{ file: file }}
            >
              {Object.keys(file.files)[0]}
            </Link>
          </h5>
        }
        componentClass={"file-name"}
      />
      <TdData
        data={
          <>
            <TdAction
              loading={starLoading}
              clickedFile={clickedFile}
              file={file}
              files={starFiles}
              handleAction={handleStar}
              checkedClass={"fa-regular fa-star checked"}
              simpleClass={"fa-regular fa-star"}
            />
            <TdAction
              loading={forkLoading}
              clickedFile={clickedFile}
              file={file}
              files={forkFiles}
              handleAction={handleGistFork}
              checkedClass={"fa-solid fa-code-fork checked"}
              simpleClass={"fa-solid fa-code-fork"}
            />
          </>
        }
        componentClass={"actionIcon"}
      />
    </tr>
  );
};

export default ListRow;
