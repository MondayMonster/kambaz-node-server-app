import model from "./model.js";
import mongoose from "mongoose";

// find all Quizzes for a course
export function findQuizzesForCourse(courseId) {
  try {
    // Check if courseId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return Promise.resolve([]);
    }
    return model.find({ course: courseId });
  } catch (error) {
    console.error("Error in findQuizzesForCourse:", error);
    return Promise.reject(error);
  }
}

// create new  Quiz
export function createQuiz(quiz) {
  console.log("quiz, ", quiz);
  delete quiz._id; // delete the previous _id from front_end
  return model.create(quiz);
}

// delete Quiz
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

// update Quiz
export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, { $set: quizUpdates });
}

// find all Quizzes
export function findAllQuizzes() {
  return model.find();
}

// find a Quiz with quizId
export function findQuizById(quizId) {
  try {
    // Check if quizId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return Promise.resolve(null);
    }
    return model.findById(quizId);
  } catch (error) {
    console.error("Error in findQuizById:", error);
    return Promise.reject(error);
  }
}