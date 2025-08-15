import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    point: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Published", "Unpublished"],
      default: "Unpublished",
    },
    assignmentGroup: { type: String, default: "Quizzes" },
    shuffleAnswer: { type: String, enum: ["Yes", "No"], default: "Yes" },
    timeLimit: { type: Number, default: 20 }, // 单位：分钟
    multipleAttempts: { type: String, enum: ["Yes", "No"], default: "No" },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "Immediately" },
    oneQuestionAtATime: { type: String, enum: ["Yes", "No"], default: "Yes" },
    webcamRequired: { type: String, enum: ["Yes", "No"], default: "No" },
    lockQuestionsAfterAnswering: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    dueDate: { type: Date, required: true },
    availableDate: { type: Date, required: true },
    untilDate: { type: Date, required: true },
    accessCode: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { collection: "quizzes", timestamps: true }
);

export default schema;