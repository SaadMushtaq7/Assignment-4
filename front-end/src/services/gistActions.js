import axios from "axios";

export const starGist = (currentFile) => {
  return axios
    .put(
      `https://api.github.com/gists/${currentFile.id}/star`,
      {
        description: currentFile.description,
        public: false,
        files: currentFile,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
        },
      }
    )
    .then((res) => {
      return res.status;
    })
    .catch((err) => console.log(err));
};

export const unStarGist = (id) => {
  return axios
    .delete(`https://api.github.com/gists/${id}/star`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
      },
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => console.log(err));
};

export const forkGist = (currentFile) => {
  return axios
    .post(
      `https://api.github.com/gists/${currentFile.id}/fork`,
      {
        description: currentFile.description,
        public: false,
        files: currentFile,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
