import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from 'cors';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Assignments/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/movieSite';
mongoose.connect(CONNECTION_STRING);
import UserRoutes from "./users/routes.js";
import session from "express-session";
import likesRoutes from './likes/routes.js';
import followRoutes from './follows/routes.js';
import commentsRoutes from './comments/routes.js';

const app = express();
app.use(cors(
    {credentials: true,
      origin: process.env.FRONTEND_URL
    }
));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
app.use(session(sessionOptions));  

app.use(express.json());

Hello(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
UserRoutes(app);
likesRoutes(app);
followRoutes(app);
commentsRoutes(app);
//app.listen(4000);
app.listen(process.env.PORT || 4000);

