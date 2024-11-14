import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { appRouter } from "./routes/route.js";

export const app = express();

// Setting up paths with ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle MIME type explicity (rare case)
app.use((req, res, next) => {
  if (req.path.endsWith(".css")) {
    res.setHeader("Content-Type", "text/css");
  }
  next();
});

// set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Flora" });
});

// app route
app.use("/", appRouter);
