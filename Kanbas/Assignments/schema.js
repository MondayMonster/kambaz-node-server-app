import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    available_date: Number,
    due_date: Number,
  },
  { collection: "assignments" }
);
export default assignmentSchema;