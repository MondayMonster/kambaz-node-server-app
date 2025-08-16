import schema from "./schema.js";
import mongoose from "mongoose";

const model = mongoose.model("comments", schema);
export default model;