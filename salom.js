fetch(
  `
https://meet-nahm.onrender.com/api/get-info`,
  {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }
)
  .then((d) => d.json())
  .then((d) => console.log(d));
