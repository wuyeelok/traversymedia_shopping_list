// Global DOM variables for easy access
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsForStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  for (const item of items) {
    if (item.innerText.toLowerCase().includes(text)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
}

function resetFilterItems() {
  const items = itemList.querySelectorAll("li");
  for (let i of items) {
    i.style.display = "flex";
  }

  itemFilter.value = "";
}

function checkUI() {
  resetFilterItems();

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.classList.add("hide");
    itemFilter.classList.add("hide");
  } else {
    clearBtn.classList.remove("hide");
    itemFilter.classList.remove("hide");
  }
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.tagName === "LI") {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  formBtn.style.backgroundColor = "#228822";
  itemInput.value = item.innerText;
}

function removeItem(item) {
  console.log(item);
  /* if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  } */
  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.innerText);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsForStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
  if (confirm("Are you sure?")) {
    // itemList.innerHTML = "";
    while (itemList.firstElementChild) {
      itemList.removeChild(itemList.firstElementChild);
    }

    // Clear from localStorage
    localStorage.removeItem("items");

    checkUI();
  }
}

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

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value.trim();

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButtonWithIcon(
    "remove-item btn-link text-red",
    "fa-solid fa-xmark"
  );
  li.appendChild(button);

  // Add li to DOM
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsForStorage();

  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsForStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

// Initialze app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem); // addEventListener will also apply to child element
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
