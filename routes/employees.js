import express from "express";
import employees from "#db/employees";

const router = express.Router();

// GET /employees - Get all employees
router.get("/", (req, res) => {
  res.send(employees);
});

// GET /employees/random - Get a random employee
// Note: this middleware has to come before /:id! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

// GET /employees/:id - Get employee by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

// POST /employees - Add a new employee
router.post("/", (req, res) => {
  // Check if request body exists and has a name property
  if (!req.body || !req.body.name) {
    return res.status(400).send("Bad Request: name is required");
  }

  // Check if name is a non-empty string
  if (typeof req.body.name !== "string" || req.body.name.trim() === "") {
    return res.status(400).send("Bad Request: name must be a non-empty string");
  }

  // Create new employee with unique ID (using array length + 1)
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name.trim(),
  };

  // Add the new employee to the array
  employees.push(newEmployee);

  // Send 201 with the new employee
  res.status(201).send(newEmployee);
});

export default router;
