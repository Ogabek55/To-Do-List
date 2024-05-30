const input = document.getElementById("todo-input");
const list = document.getElementById("items");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

function addItem() {
  const text = input.value.trim();
  if (text !== "") {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const now = new Date();
    const time = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    span.textContent = `[${time}]`;
    li.appendChild(span);
    const textNode = document.createTextNode(text);
    li.appendChild(textNode);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      const newText = prompt("Enter new text:", textNode.textContent);
      if (newText !== null && newText.trim() !== "") {
        textNode.textContent = newText.trim();
        const newTime = new Date();
        span.textContent = `[${newTime.toLocaleDateString()} ${newTime.toLocaleTimeString()}]`;
      }
    });
    li.appendChild(editButton);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      li.remove();
    });
    li.appendChild(deleteButton);
    list.appendChild(li);
    input.value = "";
  }
}
