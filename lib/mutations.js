"use strict";

const connectDB = require("./db");
const { ObjectID } = require("mongodb");
const errorHandler = require('./errorHandler')

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
      errorHandler(error);
      process.exit(1);
    }
  },

  updateCourse: async (root, { id, input }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      await db
        .collection("courses")
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },

  // STUDENTS

  createStudent: async (root, { input }) => {
    try {
      const db = await connectDB();
      const result = await db.collection("students").insertOne(input);
      console.log(result);
      input._id = result.insertedId;
      return input;
    } catch (error) {
      errorHandler(error);
      process.exit(1);
    }
  },

  updateStudent: async (root, { id, input }) => {
    try {
      const db = await connectDB();
      await db
        .collection("students")
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      const student = await db
        .collection("students")
        .findOne({ _id: ObjectID(id) });
      return student;
    } catch (error) {
      errorHandler(error);
      process.exit(1);
    }
  },

  addPeople: async (root, { courseID, personID }) => {
    try {
      const db = await connectDB();
      const course = await db
        .collection("courses")
        .findOne({ _id: ObjectID(courseID) });
      const person = await db
        .collection("students")
        .findOne({ _id: ObjectID(personID) });

      if (!course || !person) {
        throw new Error("Course or person not found");
      }

      await db
        .collection("courses")
        .updateOne(
          { _id: ObjectID(courseID) },
          { $addToSet: { people: ObjectID(personID) } }
        );

      return course;
    } catch (error) {
      errorHandler(error);
      process.exit(1);
    }
  },
};
