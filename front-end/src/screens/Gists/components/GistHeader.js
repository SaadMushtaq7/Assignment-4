import React from "react";
import { Link } from "react-router-dom";

const GistHeader = ({
  file,
  filename,
  time,
  index,
  handleDeleteGist,
  filesType,
}) => {
  return (
    <div className="user-gist-page-header">
      <div className="user-gist-page-user">
        <img src={file.owner.avatar_url} className="card-img-top" alt="User" />
        <div className="card-body">
          <h5 className="card-title">
            {file.owner.login}/<span className="card-filename">{filename}</span>
          </h5>
          <p className="card-time">{time}</p>
          <p className="card-source">Broadcast Server</p>
        </div>
      </div>
      {filesType === "userGists" && (
        <div className="user-gist-page-action">
          <Link
            to="/editgist"
            state={{
              file: file,
              index: index,
            }}
            style={{ textDecoration: "none" }}
          >
            <div className="action">
              <i className="fa-solid fa-pen-to-square" />
              Edit
            </div>
          </Link>
          <div
            className="action"
            onClick={() => {
              handleDeleteGist(file, index);
            }}
          >
            <i className="fa-solid fa-trash-can" />
            Delete
          </div>

          <div>
            Stars
            <i className="fa-regular fa-star" />
            <span>0</span>
          </div>
        </div>
      )}
      {filesType === "starGists" && (
        <div className="user-gist-page-action">
          <div
            className="action"
            onClick={() => {
              handleDeleteGist(file, index);
            }}
          >
            <i className="fa-solid fa-trash-can" />
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default GistHeader;
