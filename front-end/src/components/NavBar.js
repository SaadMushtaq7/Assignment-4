import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav-bar.css";

export default function NavBar({ user, setSearchQuery, searchFiles }) {
  const gitHub = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };
  const logout = (e) => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="nav-bar-container">
      <nav className="navbar navbar-expand-md navbar-light navbar-bg">
        <div className="container-fluid">
          <Link to="/">
            <img
              src="https://www.pasha.org.pk/pashapk/2019/07/emumba-logo.png"
              className="navbar-brand"
              alt="logo"
            />
          </Link>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-light btn-search"
              onClick={(e) => searchFiles(e)}
            >
              Search
            </button>
          </form>
          {user ? (
            <div className="dropdown">
              <img
                src={user.photos[0].value}
                id="dropdownMenuButton"
                data-toggle="dropdown"
                alt="user"
              />
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="userName">
                  <p>Signed in as</p>
                  <p className="user-name">{user.username}</p>
                </div>
                <div className="userTools">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/mygists"
                    state={{ user: user }}
                  >
                    <p>Your gists</p>
                  </Link>
                  <p>Starred gists</p>
                  <p>Help</p>
                </div>
                <div className="userLogout">
                  <p>Your GitHub Profile</p>
                  <p onClick={logout}>Sign Out</p>
                </div>
              </div>
            </div>
          ) : (
            <button className="btn btn-light btn-login" onClick={gitHub}>
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
