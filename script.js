const API_URL = "http://localhost:3000/items";

// Load items when page loads
document.addEventListener("DOMContentLoaded", loadItems);

// Handle form submission
document.getElementById("itemForm").addEventListener("submit", createItem);


/**
 * GET ─ Load all items from JSON Server
 */
async function loadItems() {
  const response = await fetch(API_URL);
  const items = await response.json();

  const list = document.getElementById("itemList");
  list.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      ${item.name}
      <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.id}')">
        Delete
      </button>
    `;

    list.appendChild(li);
  });
}


/**
 * POST ─ Create a new item
 */
async function createItem(e) {
  e.preventDefault();

  const input = document.getElementById("itemInput");

  const newItem = {
    name: input.value,
    id: String(Date.now())   // <── FIXED (always string)
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem)
  });

  input.value = "";
  loadItems();
}


/**
 * DELETE ─ Remove item by ID
 */
async function deleteItem(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadItems();
}