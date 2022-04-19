import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
/*import useSWR from "swr";
import { fetchFilesPublic } from "../ApiCalls";*/
import { setFiles } from "../redux/actions/filesActions";
import NavBar from "./NavBar";
import HomePageGrid from "./HomePageGrid";
import HomePageList from "./HomePageList";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import "../styles/home-page.css";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  /*  const { data, error } = useSWR("https://api.github.com/gists", fetcher);
  console.log(data);
*/
  //states
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(6);

  const files = useSelector((state) => state.allfiles.files);
  const [searchedData, setSearchedData] = useState([]);

  const dispatch = useDispatch();
  const fetchFiles = async () => {
    const response = await axios
      .get("https://api.github.com/gists")
      .catch((error) => console.log(`Error fetching data: ${error}`));
    dispatch(setFiles(response.data));
  };
  const getUser = async () => {
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
  };
  const startSearch = (e) => {
    e.preventDefault();

    const tempSearch = files.filter((file) => {
      if (searchQuery === "") {
        return file;
      } else if (file.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return file;
      } else {
        return null;
      }
    });
    setSearchedData(tempSearch);
  };
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = searchedData.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchFiles();
    setSearchedData(files);
    getUser();
    return () => {
      setSearchedData(files);
    };
  }, [files.length]);

  return (
    <div className="home-page-container">
      <NavBar
        user={user}
        setSearchQuery={setSearchQuery}
        startSearch={startSearch}
      />
      <div className="display-change">
        {user ? (
          <div className="add-gist-btn">
            <Link to="/addgist" state={user} style={{ textDecoration: "none" }}>
              <i className="fa-solid fa-circle-plus" />
            </Link>
          </div>
        ) : (
          ""
        )}
        <i
          onClick={(e) => {
            e.stopPropagation();
            setMode(false);
          }}
          className={!mode ? "fa-solid fa-list clicked" : "fa-solid fa-list"}
        />
        <p>|</p>
        <i
          onClick={(e) => {
            e.stopPropagation();
            setMode(true);
          }}
          className={
            mode ? "fa-solid fa-border-all clicked" : "fa-solid fa-border-all"
          }
        />
      </div>
      {searchedData.length > 0 ? (
        mode ? (
          <>
            <HomePageGrid data={currentFiles} user={user} />
            <Pagination
              filesPerPage={filesPerPage}
              totalFiles={searchedData.length}
              paginate={paginate}
            />
          </>
        ) : (
          <>
            <HomePageList data={currentFiles} user={user} />
            <Pagination
              filesPerPage={filesPerPage}
              totalFiles={searchedData.length}
              paginate={paginate}
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}
