"use strict";

require('dotenv').config();
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers.js");

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === "production";

// define schema
const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});
