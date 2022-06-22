import React from "react";

const UserInfo = ({ avatar, user }) => {
  return (
    <div className="col-4 user">
      <img src={avatar} alt="user" />
      <h4>{user.username}</h4>

      <button className="btn btn-light px-2">
        <a
          style={{ textDecoration: "none", color: "#1D80FF" }}
          href={user.profileUrl}
        >
          View Github Profile
        </a>
      </button>
    </div>
  );
};

export default UserInfo;
