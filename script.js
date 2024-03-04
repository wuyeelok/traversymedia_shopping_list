// Global DOM variables for easy access
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function createButtonWithIcon(buttonClasses, iconClasses) {
  const button = createButton(buttonClasses);
  const icon = createIcon(iconClasses);
  button.appendChild(icon);
  return button;
}

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value.trim();

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButtonWithIcon(
    "remove-item btn-link text-red",
    "fa-solid fa-xmark"
  );
  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = "";
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
