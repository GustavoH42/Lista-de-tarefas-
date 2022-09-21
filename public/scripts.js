const inputElement = document.querySelector(".new_task_input");
const addButtonTask = document.querySelector(".new_task_button");

const taskContainer = document.querySelector(".task_container");

//validando o input do usuario
const validateInput = () => {
  return inputElement.value.trim().length > 0;
};

const handleAddTask = () => {
  const inputIsValid = validateInput();
  // se o input não for valido a tarefa nem sera adicionada a outra div
  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task_item");

  const taskText = document.createElement("p");
  taskText.innerText = inputElement.value;

  taskText.addEventListener("click", () => handleClick(taskText));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-sharp");
  deleteItem.classList.add("fa-solid");
  deleteItem.classList.add("fa-trash");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskText)
  );

  taskItemContainer.appendChild(taskText);
  taskItemContainer.appendChild(deleteItem);

  taskContainer.appendChild(taskItemContainer, taskText);

  inputElement.value = "";

  uptadeLocalStorage();
};

const handleClick = (taskText) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskText);

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  uptadeLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskText) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskText);
    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  uptadeLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const uptadeLocalStorage = () => {
  const tasks = taskContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isComplete = content.classList.contains("completed");

    return { description: content.innerText, isComplete };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const getRefreshUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task_item");

    const taskText = document.createElement("p");
    taskText.innerText = task.description;

    if (task.isComplete) {
      taskText.classList.add("completed");
    }

    taskText.addEventListener("click", () => handleClick(taskText));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-sharp");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskText)
    );

    taskItemContainer.appendChild(taskText);
    taskItemContainer.appendChild(deleteItem);

    taskContainer.appendChild(taskItemContainer, taskText);
  }
};

getRefreshUsingLocalStorage();

addButtonTask.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
