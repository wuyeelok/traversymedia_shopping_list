// Global DOM variables for easy access
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

const localStorageShopListItemKeyPrefix = "shopping_list_item_";

function getShopList(localStorageKeyPrefix) {
  const items = [];

  let i = 0;
  while (localStorage.getItem(`${localStorageKeyPrefix}${i}`)) {
    const item = localStorage.getItem(`${localStorageKeyPrefix}${i}`);

    items.push(item);

    i++;
  }

  return items;
}

function saveShopList(localStorageKeyPrefix, items) {
  localStorage.clear();

  for (let i = 0; i < items.length; i++) {
    localStorage.setItem(`${localStorageKeyPrefix}${i}`, items[i]);
  }
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();

      const items = [];
      const itemLis = itemList.querySelectorAll("li");
      for (const itemLi of itemLis) {
        const item = itemLi.innerText;
        items.push(item);
      }
      saveShopList(localStorageShopListItemKeyPrefix, items);
    }
  }
}

function clearItems(e) {
  if (confirm("Are you sure?")) {
    // itemList.innerHTML = "";
    while (itemList.firstElementChild) {
      itemList.removeChild(itemList.firstElementChild);
    }

    saveShopList(localStorageShopListItemKeyPrefix, []);
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

  // Add li to DOM
  itemList.appendChild(li);

  // Add item to storage
  const items = getShopList(localStorageShopListItemKeyPrefix);
  items.push(newItem);
  saveShopList(localStorageShopListItemKeyPrefix, items);

  checkUI();

  itemInput.value = "";
}

function renderShopList(localStorageKeyPrefix) {
  while (itemList.firstElementChild) {
    itemList.removeChild(itemList.firstElementChild);
  }

  const items = getShopList(localStorageKeyPrefix);

  for (const item of items) {
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
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem); // addEventListener will also apply to child element
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

renderShopList(localStorageShopListItemKeyPrefix);
checkUI();
