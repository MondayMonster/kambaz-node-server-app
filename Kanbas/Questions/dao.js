import model from "./model.js";

// find all the Questions for a Quiz
export function findQuestionsForQuiz(quizId) {
  return model.find({ quiz: quizId });
}

// create a Question
export function createQuestion(question) {
  return model.create(question);
}

// update a Question
export function updateQuestion(questionId, questionUpdates) {
  return model.updateOne({ _id: questionId }, questionUpdates);
}

// delete a Question
export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

// find all the Questions
export function findAllQuestions() {
  return model.find();
}

// find a Question by questionId
export function findQuestionById(questionId) {
  return model.findById(questionId);
}