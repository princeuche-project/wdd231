
const navButton = document.querySelector("#menu-button");
const nav = document.querySelector("#site-nav");

if (navButton && nav) {
  navButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navButton.setAttribute("aria-expanded", String(isOpen));
    navButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    navButton.textContent = isOpen ? "×" : "☰";
  });
}


const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const visitKey = "healthyLifeVisits";
const visitCount = Number(localStorage.getItem(visitKey) || 0) + 1;
localStorage.setItem(visitKey, visitCount);
const visitElement = document.querySelector("#visit-count");
if (visitElement) visitElement.textContent = visitCount;

const preferenceForm = document.querySelector("#preference-form");
if (preferenceForm) {
  const saved = localStorage.getItem("healthyLifePreference");
  const select = preferenceForm.querySelector("#goal");
  if (saved && select) select.value = saved;

  select?.addEventListener("change", () => {
    localStorage.setItem("healthyLifePreference", select.value);
  });
}

const modal = document.querySelector("#recipe-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector("#modal-close");

function closeModal() {
  if (modal?.open) modal.close();
}
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

async function loadRecipes() {
  const grid = document.querySelector("#recipe-grid");
  if (!grid) return;

  const status = document.querySelector("#recipe-status");

  try {
    const response = await fetch("data/recipes.json");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const recipes = await response.json();

    const categoryFilter = document.querySelector("#category-filter");
    const searchInput = document.querySelector("#recipe-search");
    const favoritesOnly = document.querySelector("#favorites-only");

    const render = () => {
      const search = searchInput?.value.trim().toLowerCase() || "";
      const category = categoryFilter?.value || "All";
      const favorites = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");

      const filtered = recipes.filter(recipe => {
        const matchesCategory = category === "All" || recipe.category === category;
        const matchesSearch = `${recipe.name} ${recipe.description}`.toLowerCase().includes(search);
        const matchesFavorite = !favoritesOnly?.checked || favorites.includes(recipe.id);
        return matchesCategory && matchesSearch && matchesFavorite;
      });

      grid.innerHTML = filtered.map(recipe => {
        const isFavorite = favorites.includes(recipe.id);
        return `
          <article class="recipe-card">
            <img class="feature-img" src="${recipe.image}" alt="${recipe.name}" loading="lazy" width="800" height="500">
            <div class="recipe-content">
              <h3>${recipe.name}</h3>
              <div class="recipe-meta">
                <span class="badge">${recipe.category}</span>
                <span class="badge">${recipe.time}</span>
                <span class="badge">${recipe.calories} kcal</span>
              </div>
              <p>${recipe.description}</p>
              <div class="card-actions">
                <button class="small-btn view-btn" type="button" data-id="${recipe.id}">Details</button>
                <button class="small-btn ${isFavorite ? "favorite" : ""} favorite-btn" type="button" data-id="${recipe.id}" aria-pressed="${isFavorite}">
                  ${isFavorite ? "★ Saved" : "☆ Save"}
                </button>
              </div>
            </div>
          </article>`;
      }).join("");

      if (status) status.textContent = `${filtered.length} recipe${filtered.length === 1 ? "" : "s"} displayed.`;

      grid.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", () => {
          const recipe = recipes.find(item => item.id === Number(button.dataset.id));
          if (!recipe || !modal) return;
          modalTitle.textContent = recipe.name;
          modalBody.innerHTML = `
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Preparation time:</strong> ${recipe.time}</p>
            <p><strong>Calories:</strong> ${recipe.calories} kcal</p>
            <p>${recipe.description}</p>
            <p><strong>Tip:</strong> Pair this meal with water and a variety of colorful vegetables or fruit.</p>`;
          modal.showModal();
        });
      });

      grid.querySelectorAll(".favorite-btn").forEach(button => {
        button.addEventListener("click", () => {
          const id = Number(button.dataset.id);
          const current = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");
          const updated = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
          localStorage.setItem("favoriteRecipes", JSON.stringify(updated));
          render();
        });
      });
    };

    categoryFilter?.addEventListener("change", render);
    searchInput?.addEventListener("input", render);
    favoritesOnly?.addEventListener("change", render);
    render();
  } catch (error) {
    console.error("Unable to load recipe data:", error);
    if (status) {
      status.textContent = "Recipe data could not be loaded. Please try again later.";
      status.classList.add("error");
    }
  }
}

loadRecipes();

const waterForm = document.querySelector("#water-form");
waterForm?.addEventListener("submit", event => {
  event.preventDefault();
  const weight = Number(document.querySelector("#water-weight")?.value);
  const result = document.querySelector("#water-result");
  if (!weight || weight <= 0) {
    result.textContent = "Please enter a valid weight.";
    return;
  }
  result.textContent = `A simple estimate is ${(weight * 0.035).toFixed(1)} liters of water per day. Individual needs vary.`;
});
