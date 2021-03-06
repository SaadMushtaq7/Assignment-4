export const getUser = () => {
  return fetch("http://localhost:5000/auth/login/success", {
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
      return resObject;
    })
    .catch((err) => {
      console.log(err);
    });
};
