import axios from "axios";

export const createGist = (file, description) => {
  return axios
    .post(
      "https://api.github.com/gists",
      { files: file, description: description },
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
    .catch((error) => {
      console.log(`Error adding data: ${error}`);
      return error;
    });
};

export const fetchUserGists = (username) => {
  return axios
    .get(`https://api.github.com/users/${username}/gists`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(`Error fetching data: ${error}`);
      return error;
    });
};

export const fetchPublicGists = () => {
  return axios
    .get("https://api.github.com/gists")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(`Error fetching data: ${error}`);
    });
};

export const fetchStarredGists = () => {
  return axios
    .get(`https://api.github.com/gists/starred`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(`Error fetching data: ${error}`);
    });
};

export const fetchGistRaw = (link) => {
  return axios
    .get(link)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(`Error fetching data: ${error}`);
      return error;
    });
};

export const updateGist = (tempFile, description, id) => {
  return axios
    .patch(
      `https://api.github.com/gists/${id}`,
      { files: tempFile, description: description },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(`Error Updating data: ${err}`);
    });
};

export const deleteGist = (id) => {
  return axios
    .delete(`https://api.github.com/gists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GIT_PAK}`,
      },
    })
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      console.log(`Error Deleting data: ${error}`);
      return error;
    });
};
