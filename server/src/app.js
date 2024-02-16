import "dotenv/config.js";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";
import rootRoutes from "./routes/index.js";
import globalErrorHandler, { throwErr } from "./controllers/errorController.js";
// import googleLoginStrategy from "./services/googleStrategy.js";
import { isProduction } from "./utils/helpers.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

// passport.use(googleLoginStrategy);

app.use("/api", rootRoutes);

if (isProduction) {
  const __dirname = path.resolve();
  // making dist static folder
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // any route thats not /api/users gonna load fronend index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

app.use(globalErrorHandler);

export { app };
