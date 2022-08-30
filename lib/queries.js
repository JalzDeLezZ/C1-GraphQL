"use strict";

const connectDB = require("./db");
const { ObjectID } = require("mongodb");

module.exports = {
  getCourses: async () => {
    let db;
    let courses = [];
    try {
      db = await connectDB();
      courses = await db.collection("courses").find().toArray();
    } catch (error) {
      console.error(error);
    }
    return courses;
  },

  getCourse: async (root, { id }) => {
    // return courses.find((course) => course._id === id);
    let db, course;
    try {
      db = await connectDB();
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
    }
    return course;
  },
};
