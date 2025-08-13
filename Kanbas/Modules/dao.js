import mongoose from "mongoose";
import model from "./model.js";

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function createModule(module) {
 delete module._id;
  const newModule = model.create(module);
  return newModule;
}

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, moduleUpdates);
}

export function deleteModulesForCourse(courseId) {
  return model.deleteMany({ course: courseId });
}