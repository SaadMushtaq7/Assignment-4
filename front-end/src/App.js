import React, { useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile, setStarFiles } from "./redux/actions/filesActions";
import { getUser } from "./services/githubLogin";
import useApiCall from "./customHooks/useApiCall";
import HomePage from "./screens/homePage/HomePage";
import GistPage from "./screens/GistPage";
import GistActions from "./screens/GistActions/GistActions";
import GistList from "./screens/Gists/GistList";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const { data: starredData, error: starredError } = useApiCall({
    url: "https://api.github.com/gists/starred",
    method: "get",
    headerCheck: true,
  });

  const handleGetUser = useCallback(async () => {
    const response = await getUser();
    if (response.success) {
      dispatch(setUserProfile(response.user));
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetUser();

    if ((starredData, !starredError)) {
      dispatch(setStarFiles(starredData));
    }
  }, [handleGetUser, starredData, starredError]);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/file" element={<GistPage />} />

          <Route
            path="/addgist"
            element={/*<CreateGistFile />*/ <GistActions />}
          />

          <Route path="/mygists" element={/*<UserGists />*/ <GistList />} />

          <Route
            path="/starredgists"
            element={/*<StarredFiles />*/ <GistList />}
          />

          <Route
            path="/editgist"
            element={/*<EditGistFile />*/ <GistActions />}
          />
        </Routes>
      </>
    </Router>
  );
};

export default App;
