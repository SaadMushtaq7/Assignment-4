import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./components/HomePage";
import GistPage from "./components/GistPage";
import CreateGistFile from "./components/CreateGistFile";
import store from "./redux/store";
import UserGists from "./components/UserGists";
import EditGistFile from "./components/EditGistFile";

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
