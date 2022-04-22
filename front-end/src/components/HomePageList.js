import React from "react";
import { Link } from "react-router-dom";
import "../styles/home-page-list.css";

export default function HomePageList({ data, user }) {
  return (
    <div className="home-page-list-container">
      <table className="table table-light">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" className="checkbox-size" />
            </th>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Keyword</th>
            <th scope="col">Notebook Name</th>
            <th scope="col">
              <i className="fa-regular fa-star" />
              <i className="fa-solid fa-code-fork" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((file, index) => {
            const [date, fTime] = file.created_at.split("T");
            const [time] = fTime.split("Z");
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" className="checkbox-size" />
                </td>
                <td className="user-img">
                  <img src={file.owner.avatar_url} alt="user" />
                </td>
                <td>{file.owner.login}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>Web Server</td>
                <td className="file-name">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/file"
                    state={{ file: file, user: user }}
                  >
                    {Object.keys(file.files)[0]}
                  </Link>
                </td>
                <td className="actionIcon">
                  <i className="fa-regular fa-star" />
                  <i className="fa-solid fa-code-fork" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
