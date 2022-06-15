import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "./redux/actions/filesActions";
import HomePage from "./components/HomePage";
import GistPage from "./components/GistPage";
import CreateGistFile from "./components/CreateGistFile";
import UserGists from "./components/UserGists";
import EditGistFile from "./components/EditGistFile";

export default function App() {
  const dispatch = useDispatch();

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
        dispatch(setUserProfile(resObject.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/file" element={<GistPage />} />

          <Route path="/addgist" element={<CreateGistFile />} />

          <Route path="/mygists" element={<UserGists />} />

          <Route path="/editgist" element={<EditGistFile />} />
        </Routes>
      </>
    </Router>
  );
}
