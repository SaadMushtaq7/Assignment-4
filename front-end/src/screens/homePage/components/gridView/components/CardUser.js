import React from "react";
import { Link } from "react-router-dom";

const CardUser = ({ avatar, username, file, time }) => {
  return (
    <div className="grid-user">
      <img src={avatar} className="card-img-top" alt="User" />
      <div className="card-body">
        <h5 className="card-title">
          {username}/
          <span>
            <Link
              style={{ textDecoration: "none" }}
              to="/file"
              state={{ file: file }}
            >
              {Object.keys(file.files)[0]}
            </Link>
          </span>
        </h5>
        <p className="card-time">{time}</p>
        <p className="card-source">Broadcast Server</p>
      </div>
    </div>
  );
};

export default CardUser;
