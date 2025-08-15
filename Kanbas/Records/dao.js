import RecordModel from "./model.js";

// create a record
export const createRecord = async (record) => {
  console.log("Creating record with data:", record);
  return RecordModel.create(record);
};

// find all records for a Quiz
export const findRecordsForQuiz = async (quizId) => {
  console.log("Finding records for quizId:", quizId);
  const records = await RecordModel.find({ quizId: quizId.toString() });
  console.log("Found records for quizId:", records);
  return records;
};

// find all records for a User
export const findRecordsForUser = async (userId) => {
  console.log("Finding records for userId");
  const records = await RecordModel.find({ userId: userId.toString() });
  console.log("Found records for userId:", records);
  return records;
};

// find all the records for a User in a Quiz
export const findRecordsForQuizAndUser = async (quizId, userId) => {
  console.log("Finding records for quizId, ", quizId, " and userId, ", userId);

  const records = await RecordModel.find({
    quizId: quizId.toString(),
    userId: userId.toString(),
  });

  console.log("Found records for quizId and userId", records);
  return records;
};

// delete a record
export const deleteRecord = async (recordId) => {
  console.log("Deleting record with recordId:", recordId);
  const result = await RecordModel.deleteOne({ _id: recordId });
  console.log("Delete result:", result);
  return result;
};