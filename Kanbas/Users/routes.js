import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    // delete all enrollments of user
    await enrollmentsDao.deleteEnrollmentsForUser(userId);
    const status = await dao.deleteUser(userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

  const findAllUsers = async (req, res) => {
    try {
      // find users of specific role
      const { role, name } = req.query;
      if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }
      // filtering users by their first or lastName
      if (name) {
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
      // find all users
      console.log("Finding all users...");
      const users = await dao.findAllUsers();
      console.log("Found users:", users.length);
      res.json(users);
    } catch (error) {
      console.error("Error in findAllUsers:", error);
      res.status(500).json({ error: error.message });
    }
  };
  app.get("/api/users", findAllUsers);

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  app.get("/api/users/:userId", findUserById);

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
  };
  app.put("/api/users/:userId", updateUser);

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  app.post("/api/users/signup", signup);

  const signin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Signin attempt:", { username, password }); // Debug log
    const currentUser = await dao.findUserByCredentials(username, password);
    console.log("Found user:", currentUser); // Debug log
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
    // console.log("sign in current user!!", currentUser);
  };
  app.post("/api/users/signin", signin);

  const signout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    // console.log("profile current user!!", currentUser);
    res.json(currentUser);
  };
  app.post("/api/users/profile", profile);

  const findCoursesForUser = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      
      if (currentUser.role === "ADMIN") {
        const courses = await courseDao.findAllCourses();
        res.json(courses);
        return;
      }
      
      let { uid } = req.params;
      // Handle undefined user ID
      if (uid === "undefined" || uid === undefined) {
        uid = currentUser._id; // Use current user as fallback
      }
      
      if (uid === "current") {
        uid = currentUser._id;
      }
      
      // Add additional check to ensure uid is valid
      if (!uid) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const courses = await enrollmentsDao.findCoursesForUser(uid);
      res.json(courses);
    } catch (error) {
      console.error("Error in findCoursesForUser:", error);
      res.status(500).json({ error: error.message || "Failed to fetch courses" });
    }
  };
  app.get("/api/users/:uid/courses", findCoursesForUser);

  const findEnrollmentsForUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  // Debug route to check database content
  const checkDatabase = async (req, res) => {
    try {
      const allUsers = await dao.findAllUsers();
      const userCount = allUsers.length;
      const usernames = allUsers.map(user => user.username);
      res.json({
        userCount,
        usernames,
        firstUser: allUsers[0] || null
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  app.get("/api/users/debug", checkDatabase);
}
