import db from "../Database/index.js";
function AssignmentRoutes(app) {
app.post("/api/courses/:cid/assignments/", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
    });
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments
      .filter((m) => m.course === cid);
    res.send(assignments);
  });
}
export default AssignmentRoutes;

