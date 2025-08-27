let todosArray = [];
let nextId = 1;

// The data model for each todo is as follows:
// {
//     "task": "Buy groceries",
//     "completed": false,
//     "dueDate": "2025-08-30"
// }

function addOne(task, completed, dueDate) {
  if (!task || typeof completed !== 'boolean' || !dueDate) {
    return false;
  }

  const newTodo = {
    id: nextId++,
    task,
    completed,
    dueDate,
  };

  todosArray.push(newTodo);
  return newTodo;
}

function getAll() {
  return todosArray;
}

function findById(id) {
  const numericId = Number(id);
  const todo = todosArray.find((item) => item.id === numericId);
  return todo || false;
}

function updateOneById(id, updatedData) {
  const todo = findById(id);
  if (todo) {
    if (updatedData.task) todo.task = updatedData.task;
    if (updatedData.completed !== undefined) todo.completed = updatedData.completed;
    if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
    return todo;
  }
  return false;
}

function deleteOneById(id) {
  const todo = findById(id);
  if (todo) {
    const initialLength = todosArray.length;
    todosArray = todosArray.filter((todo) => todo.id !== Number(id));
    return todosArray.length < initialLength;
  }
  return false;
}

if (require.main === module) {
  // Test addOne
  console.log("Adding todo: ", addOne("Buy groceries", false, "2025-08-30"));
  console.log("Adding another todo: ", addOne("Finish homework", false, "2025-08-29"));
  
  // Test getAll
  console.log("getAll called:", getAll());
  
  // Test findById
  console.log("findById called:", findById(1));
  
  // Test updateOneById
  console.log("updateOneById called:", updateOneById(1, { completed: true }));
  console.log("After update:", findById(1));
  
  // Test deleteOneById
  console.log("deleteOneById called:", deleteOneById(2));
  console.log("After delete:", getAll());
}

const ToDos = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = ToDos;