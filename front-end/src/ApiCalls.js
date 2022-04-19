import axios from "axios";

const gitPAT = `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`;

export const getUserFiles = async (url) => {
  await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gitPAT}`,
      },
    })
    .then((res) => res.data);
};

export const fetchFilesPublic = (url) => {
  axios.get(url).then((res) => res.data);
};
