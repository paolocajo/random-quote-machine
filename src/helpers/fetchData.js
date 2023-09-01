export const fetchData = (url) => {
  return fetch(url)
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "An error has occurred",
          })
    )
    .catch((err) => err);
};
