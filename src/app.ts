import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import { db, ENV } from "./config";
import apiV1Routes from "./routes/v1";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger";

dotenv.config();

const app = express();
const port = ENV.PORT || 5500

app.use(cors());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

db.sync({
  // force:true
})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

app.use("/api/v1", apiV1Routes);

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(
    `\n\nMaliroso Server:\n\nApi docs, open @  http://localhost:${port}/api-docs`
  )
  console.log(`\nLocal baseUrl, use @ http://localhost:${port}/api/`)
})
// module.exports = app;
