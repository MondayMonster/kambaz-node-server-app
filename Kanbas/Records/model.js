import mongoose from "mongoose";
import schema from "./schema.js";

const RecordModel = mongoose.model("RecordModel", schema);

export default RecordModel;