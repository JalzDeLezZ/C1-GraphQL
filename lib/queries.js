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
    let db, course;
    try {
      db = await connectDB();
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
    }
    return course;
  },

  // STUDENTS

  
  getStudents: async () => {
    try {
      const db = await connectDB();
      const res = await db.collection("students").find().toArray();
      return res;
    } catch (error) {
      console.error(error);
    }
  },

  getStudent: async (root, { id }) => {
    try {
      const db = await connectDB();
      const course = await db.collection("students").findOne({ _id: ObjectID(id) });
      return course;
    } catch (error) {
      console.error(error);
    }
  },
};
