import * as quizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  // find all Quizzes for a course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    try {
      const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes for course:", error);
      res.sendStatus(500);
    }
  });

  // create new Quiz
  app.post("/api/quizzes", async (req, res) => {
    const newQuiz = req.body;
    try {
      const createdQuiz = await quizzesDao.createQuiz(newQuiz);
      res.status(201).json({
        message: `Quiz: "${createdQuiz.title}" has been created`,
        quiz: createdQuiz,
      }); // retur info and new Quiz
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Error when creating new Quiz" });
    }
  });

  // update Quiz
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    try {
      const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
      if (status.modifiedCount === 1) {
        res.status(200).json({ message: `Quiz "${quizId}" updated!` });
      } else {
        res.status(404).json({ message: `Quiz "${quizId}" can not found` });
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: "Error when updating Quiz" });
    }
  });

  // delete Quiz
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      // find the Quiz which is going to be deleted
      const quiz = await quizzesDao.findQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: `Quiz ${quizId} not found` });
      }

      // delete Quiz
      const status = await quizzesDao.deleteQuiz(quizId);
      if (status.deletedCount === 1) {
        res.status(200).json({ message: `Quiz: "${quiz.title}" deleted` });
      } else {
        res.status(500).json({ message: `Error delete Quiz ${quizId} ` });
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.sendStatus(500);
    }
  });

  // find all Quizzes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await quizzesDao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching all quizzes:", error);
      res.sendStatus(500);
    }
  });

  // find a Quiz with quizId
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await quizzesDao.findQuizById(quizId);
      if (quiz) {
        res.json(quiz);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.sendStatus(500);
    }
  });
}