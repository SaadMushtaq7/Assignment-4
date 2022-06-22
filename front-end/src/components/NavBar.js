import React from "react";
import { Link } from "react-router-dom";
//import GitHubLogin from "react-github-login";
//import { useDispatch } from "react-redux";
//import { setUserProfile } from "../redux/actions/filesActions";
import "../styles/navBar.css";

const NavBar = ({ user, setSearchQuery, searchFiles }) => {
  const gitHub = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };
  const logout = (e) => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  /* const getUserToken = (code) => {
    const clientId = "089bddea47eeab5fcc52";
    const clientSecret = "02263790af275ae169b07704d822cafa38bd229b";
    const requestBody = {
      headers: {
        accept: "application/vnd.github.v3+json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${code}&client_id=${clientId}&client_secret=${clientSecret}`,
    };
    return fetch(
      "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
      {
        method: "post",
        ...requestBody,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.access_token);
        return data.access_token;
      });
  };

  const onSuccess = async (response) => {
    console.log("successfull");
    //   const accessToken = await getUserToken(response);
    //   localStorage.setItem("accessToken", accessToken);
  };
  const onFailure = (response) => console.log(response);
*/
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
                    state={{
                      filesType: "userGists",
                    }}
                    to="/mygists"
                  >
                    <p>Your gists</p>
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    state={{
                      filesType: "starGists",
                    }}
                    to="/starredgists"
                  >
                    <p>Starred gists</p>
                  </Link>

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
};

export default NavBar;

/*
<GitHubLogin
              className="btn btn-light btn-login"
              clientId="089bddea47eeab5fcc52"
              onSuccess={onSuccess}
              onFailure={onFailure}
              buttonText="LOGIN"
              valid={true}
              redirectUri="http://localhost:5000/auth/github/callback"
              scope="gist"
            />
*/
