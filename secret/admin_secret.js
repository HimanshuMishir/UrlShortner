require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  hasura_url: process.env.HASURA_URL,
  hasura_secret: process.env.HASURA_SECRET,
};
