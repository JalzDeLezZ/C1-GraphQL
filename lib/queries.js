"use strict";

const connectDB = require("./db");
const { ObjectID } = require("mongodb");
const errorHandler = require("./errorHandler");

module.exports = {
  getCourses: async () => {
    let db;
    let courses = [];
    try {
      db = await connectDB();
      courses = await db.collection("courses").find().toArray();
    } catch (error) {
      errorHandler(error);
    }
    return courses;
  },

  getCourse: async (root, { id }) => {
    let db, course;
    try {
      db = await connectDB();
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },

  // STUDENTS

  getPeople: async () => {
    try {
      const db = await connectDB();
      const res = await db.collection("students").find().toArray();
      return res;
    } catch (error) {
      errorHandler(error);
    }
  },

  getPerson: async (root, { id }) => {
    try {
      const db = await connectDB();
      const course = await db
        .collection("students")
        .findOne({ _id: ObjectID(id) });
      return course;
    } catch (error) {
      errorHandler(error);
    }
  },

  searchItems: async (root, { keyword }) => {
    try {
      const db = await connectDB();
      const courses = await db
        .collection("courses")
        .find({
          $text: { $search: keyword },
        })
        .toArray();
      const students = await db
        .collection("students")
        .find({
          $text: { $search: keyword },
        })
        .toArray();
      const items = [...courses, ...students];
      // return students;
      return items;
    } catch (error) {
      errorHandler(error);
    }
  },
};
