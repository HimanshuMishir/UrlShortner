const express = require("express");
const { port } = require("./secret/admin_secret");
const request = require("./hasuraDB/request");
const shortId = require("shortid");

const app = express();

app.get("/", async (req, res) => {
  const response = await request(
    `query myquery1{UrlShortner{original_url,shorted_url,clicks}}`
  );

  console.log(response);
  if (!response) {
    res.status(500).send({ message: "Something bad happened!!" });
  }
  res.send(response);
});

app.post("/", async (req, res) => {
  const { original_url } = req.body;
  const shorted_url = shortId.generate;

  const response = await request(`mutation {
    insert_UrlShortner_one(object: {original_url: "${original_url}", shorted_url: "${shorted_url}", clicks: ${0}}) {
      id
    }
  }`);
  if (!response) {
    res.status(500).send({ message: "Try entering different url!!" });
  }
  res.redirect("/");
});

app.get("/:shorturls", async (req, res) => {
  request(`query MyQuery {
    UrlShortner(where: {shorted_url: {_eq: "${req.params.shorturls}"}}) {
      original_url
    }
  }`).then((resp) => {
     console.log(resp);

    if (resp.UrlShortner.length == 0) {
      return res.status(404).send({ message: "The Requested Url Not Found!" });
    }

    res.redirect(resp.UrlShortner[0].original_url);
  });

  // console.log(response.UrlShortner.length)
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
