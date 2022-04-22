import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import HomePageGrid from "./HomePageGrid";
import HomePageList from "./HomePageList";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import { setFiles } from "../redux/actions/filesActions";
import "../styles/home-page.css";

export default function HomePage() {
  //states
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(6);

  const files = useSelector((state) => state.allfiles.files);
  const [searchedData, setSearchedData] = useState(files);

  const dispatch = useDispatch();

  const fetchFiles = useCallback(async () => {
    const response = await axios
      .get("https://api.github.com/gists")
      .catch((error) => {
        console.log(`Error fetching data: ${error}`);
        setError(error);
      });
    dispatch(setFiles(response.data));
  }, [dispatch]);

  const getUser = useCallback(async () => {
    await fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed");
      })
      .then((resObject) => {
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchFiles = (e) => {
    e.preventDefault();
    let tempData = files;
    if (searchQuery) {
      tempData = files.filter((file) =>
        file.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setSearchedData(tempData);
  };

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = searchedData.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchFiles();
    getUser();
    setSearchedData(files);
  }, [files, getUser, fetchFiles]);

  return (
    <div className="home-page-container">
      <NavBar
        user={user}
        setSearchQuery={setSearchQuery}
        searchFiles={searchFiles}
      />
      <div className="display-change">
        {user && (
          <div className="add-gist-btn">
            <Link
              to="/addgist"
              state={{ user: user }}
              style={{ textDecoration: "none" }}
            >
              <i className="fa-solid fa-circle-plus" />
            </Link>
          </div>
        )}
        <i
          onClick={(e) => {
            setMode(false);
          }}
          className={!mode ? "fa-solid fa-list clicked" : "fa-solid fa-list"}
        />
        <p>|</p>
        <i
          onClick={(e) => {
            setMode(true);
          }}
          className={
            mode ? "fa-solid fa-border-all clicked" : "fa-solid fa-border-all"
          }
        />
      </div>
      {searchedData.length ? (
        <>
          {mode ? (
            <HomePageGrid data={currentFiles} user={user} />
          ) : (
            <HomePageList data={currentFiles} user={user} />
          )}
          <Pagination
            filesPerPage={filesPerPage}
            totalFiles={searchedData.length}
            paginate={paginate}
          />
        </>
      ) : (
        <Spinner error={error} />
      )}
    </div>
  );
}
