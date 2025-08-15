import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    score: { type: Number, required: true },
    attemptTime: { type: Date, default: Date.now },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        answer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        pointsEarned: { type: Number, required: true },
      },
    ],
  },
  { collection: "records" }
);

export default recordSchema;