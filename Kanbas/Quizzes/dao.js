import model from "./model.js";

// find all Quizzes for a course
export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
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
  return model.findById(quizId);
}