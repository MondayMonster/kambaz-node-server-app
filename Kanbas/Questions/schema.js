import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" }, // 关联的 Quiz ID
    type: { type: String, enum: ["True/False", "Multiple Choice", "Fill in the Blank"], required: true },
    title: { type: String, required: true },
    points: { type: Number, required: true },
    description: { type: String },
    options: [{ text: String, isCorrect: Boolean }], // 用于 Multiple Choice
    correctAnswers: [String], // 用于 Fill in the Blank
    correctAnswer: Boolean, // 用于 True/False
  },
  { collection: "questions" }
);

export default questionSchema;