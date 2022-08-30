"use strict";

const connectDB = require("./db");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };

    const newCouse = Object.assign(defaults, input);

    try {
      const db = await connectDB();
      const result = await db.collection("courses").insertOne(newCouse);
      newCouse._id = result.insertedId;
      return newCouse;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  },
};
