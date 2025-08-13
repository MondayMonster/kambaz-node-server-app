import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

// When delete course, delete Enrollments for Course
export async function deleteEnrollmentsForCourse(courseId) {
  return model.deleteMany({ course: courseId });
}

export async function deleteEnrollmentsForUser(userId) {
  return model.deleteMany({ user: userId });
}

export async function enrollUserInCourse(userId, courseId) {
  const enrollment = new model({ user: userId, course: courseId });
  return enrollment.save();
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function findEnrollmentsForUser(userId) {
  const curUserEnrollments = await model
    .find({ user: userId })
    .populate("course");
  return curUserEnrollments;
}