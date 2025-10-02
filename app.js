import express from "express";
import employeesRouter from "./routes/employees.js";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

// Use the employees router for all /employees routes
app.use("/employees", employeesRouter);

// Catch-all error-handling middleware
// Note: This must be defined after all routes and other middleware
app.use((err, req, res, next) => {
  console.error("Uncaught error:", err);
  res.status(500).send("Internal Server Error");
});

export default app;
