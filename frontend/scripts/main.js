const apiUrl = "http://localhost:5000/api/menus";

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
      console.log("Menu à éditer :", menu);
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

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ day, meal, ingredients }),
  });

  e.target.reset();
  fetchMenus();
});

fetchMenus();
