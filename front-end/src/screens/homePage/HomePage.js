import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as R from "ramda";
import { setFiles } from "../../redux/actions/filesActions";
import { isSomething } from "../../services/isSomething";
import useApiCall from "../../customHooks/useApiCall";
import NavBar from "../../components/NavBar";
import GridTableView from "./components/gridView/GridTableView";
import ListTableView from "./components/listView/ListTableView";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import "./homePage.css";

const HomePage = () => {
  //states
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 6;
  const files = useSelector((state) => state.allfiles.files);

  const [searchedData, setSearchedData] = useState(files);

  const user = useSelector((state) => state.userProfile.user);

  const dispatch = useDispatch();

  const {
    data: publicData,
    error: publicError,
    loading: publicLoading,
  } = useApiCall({
    url: "https://api.github.com/gists",
    method: "get",
  });

  const searchFiles = (e) => {
    e.preventDefault();
    let tempData = files;
    if (searchQuery) {
      const filterById = (gist) => searchQuery === gist.id;
      tempData = R.filter(filterById, files);
    }
    setSearchedData(tempData);
  };

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = searchedData.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (publicData && !publicError) {
      dispatch(setFiles(publicData));
    }
    setSearchedData(files);
  }, [files.length, dispatch, publicData, publicError]);
  return (
    <div className="home-page-container">
      <NavBar
        user={R.pathOr(null, [], user)}
        setSearchQuery={setSearchQuery}
        searchFiles={searchFiles}
      />

      <div className="display-change">
        {user && (
          <div className="add-gist-btn">
            <Link to="/addgist" style={{ textDecoration: "none" }}>
              <i className="fa-solid fa-circle-plus" />
            </Link>
          </div>
        )}
        <i
          onClick={() => {
            setMode("list");
          }}
          className={
            mode === "list" ? "fa-solid fa-list clicked" : "fa-solid fa-list"
          }
        />
        <p>|</p>
        <i
          onClick={() => {
            setMode("grid");
          }}
          className={
            mode === "grid"
              ? "fa-solid fa-border-all clicked"
              : "fa-solid fa-border-all"
          }
        />
      </div>
      {isSomething(searchedData) && (
        <>
          {mode === "grid" && (
            <GridTableView data={R.pathOr([], [], currentFiles)} />
          )}
          {mode === "list" && (
            <ListTableView data={R.pathOr([], [], currentFiles)} />
          )}
          <Pagination
            filesPerPage={R.pathOr(6, [], filesPerPage)}
            totalFiles={R.pathOr(6, ["length"], searchedData)}
            paginate={paginate}
          />
        </>
      )}
      {publicLoading && <Spinner error={R.pathOr(null, [], publicError)} />}
    </div>
  );
};

export default HomePage;
