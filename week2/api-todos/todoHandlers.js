 const ToDos = require("./todoLib");

// GET /todos
const getAllTodos = (req, res) => {
  const todos = ToDos.getAll();
  res.json(todos);
};

// POST /todos
const createTodo = (req, res) => {
  const { task, completed, dueDate } = req.body;

  const newTodo = ToDos.addOne(task, completed, dueDate);

  if (newTodo) {
    res.json(newTodo);
  } else {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

// GET /todos/:todoId
const getTodoById = (req, res) => {
  const todoId = req.params.todoId;
  const todo = ToDos.findById(todoId);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

// PUT /todos/:todoId
const updateTodo = (req, res) => {
  const todoId = req.params.todoId;

  const { task, completed, dueDate } = req.body;

  const updatedTodo = ToDos.updateOneById(todoId, {
    task,
    completed,
    dueDate,
  });

  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

// DELETE /todos/:todoId
const deleteTodo = (req, res) => {
  const todoId = req.params.todoId;

  const isDeleted = ToDos.deleteOneById(todoId);

  if (isDeleted) {
    res.json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};