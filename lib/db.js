"use strict";

const { MongoClient } = require("mongodb");
// const { DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT } = process.env;

const mongoUrl = `mongodb://localhost:27017/`;
let connection;

async function connectDB() {
  if (connection) return connection;
  let client;
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   dbName: 'db_graphql'
    });
    connection = client.db("db_graphql");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  return connection;
}

module.exports = connectDB;