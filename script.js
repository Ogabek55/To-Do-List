const input = document.getElementById("todo-input");
const list = document.getElementById("items");

document.addEventListener("DOMContentLoaded", loadTasks);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = createListItem(task.text, task.time);
    list.appendChild(li);
  });
}

function createListItem(text, time) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = `[${time}]`;
  li.appendChild(span);
  const textNode = document.createTextNode(text);
  li.appendChild(textNode);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit";
  editButton.addEventListener("click", function () {
    const newText = prompt("Enter new text:", textNode.textContent);
    if (newText !== null && newText.trim() !== "") {
      textNode.textContent = newText.trim();
      const newTime = new Date();
      span.textContent = `[${newTime.toLocaleDateString()} ${newTime.toLocaleTimeString()}]`;
      updateLocalStorage();
    }
  });
  li.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    li.remove();
    updateLocalStorage();
  });
  li.appendChild(deleteButton);

  return li;
}

function addItem() {
  const text = input.value.trim();
  if (text !== "") {
    const now = new Date();
    const time = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    const li = createListItem(text, time);
    list.appendChild(li);
    input.value = "";
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const tasks = [];
  list.querySelectorAll("li").forEach((li) => {
    const text = li.childNodes[1].textContent;
    const time = li.childNodes[0].textContent.replace(/[\[\]]/g, "");
    tasks.push({ text, time });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
