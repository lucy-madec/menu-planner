const apiUrl = "http://localhost:5000/api/menus";

let currentEditId = null;

async function fetchMenus() {
  const res = await fetch(apiUrl);
  const menus = await res.json();
  const list = document.getElementById("menu-list");
  list.innerHTML = "";

  menus.forEach((menu) => {
    const li = document.createElement("li");
    li.textContent = `${menu.day} : ${menu.meal} (${menu.ingredients.join(
      ", "
    )})`;

    // 🔧 Supprimer (❌)
    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = async () => {
      await fetch(`${apiUrl}/${menu._id}`, { method: "DELETE" });
      fetchMenus();
    };

    // ✏️ Modifier
    const edit = document.createElement("button");
    edit.textContent = "✏️";
    edit.onclick = () => {
      // Stocke l'ID pour une future mise à jour
      currentEditId = menu._id;

      // Pré-remplit le formulaire
      document.getElementById("day").value = menu.day;
      document.getElementById("meal").value = menu.meal;
      document.getElementById("ingredients").value =
        menu.ingredients.join(", ");
    };

    // 👇 Ajout dans l'ordre
    li.appendChild(edit);
    li.appendChild(del);
    list.appendChild(li);
  });
}

document.getElementById("menu-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const day = document.getElementById("day").value;
  const meal = document.getElementById("meal").value;
  const ingredients = document
    .getElementById("ingredients")
    .value.split(",")
    .map((i) => i.trim());

  const menuData = { day, meal, ingredients };

  // 🔁 Si currentEditId est défini, on fait un PUT (mise à jour)
  if (currentEditId) {
    await fetch(`${apiUrl}/${currentEditId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuData),
    });
    currentEditId = null; // On réinitialise l'état d'édition
  } else {
    // Sinon, on fait un POST (ajout normal)
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuData),
    });
  }

  e.target.reset(); // Vide le formulaire
  fetchMenus(); // Recharge la liste
});
