import Database from "../Database/index.js";

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  const curUserEnrollments = enrollments.filter(
    (enrollment) => enrollment.user === userId
  );
  return curUserEnrollments;
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unEnrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
  );
}
