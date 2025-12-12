const API_KEY = "aB9vP1ee96KwagpZsluHz5Mh0UGahDiJ";
const API_URL = "https://api.giphy.com/v1/gifs/search";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");
const resultsMessage = document.getElementById("resultsMessage");

const themeMenuButton = document.getElementById("themeMenuButton");
const themeMenuDropdown = document.getElementById("themeMenuDropdown");

const themeDefaultBtn = document.getElementById("themeDefault");
const themePastelBtn = document.getElementById("themePastel");
const themeDarkBtn = document.getElementById("themeDark");

function applySavedTheme() {
  const saved = localStorage.getItem("theme") || "default";
  document.body.classList.remove("theme-pastel", "theme-dark");
  if (saved === "pastel") document.body.classList.add("theme-pastel");
  if (saved === "dark") document.body.classList.add("theme-dark");
}

function saveTheme(value) {
  localStorage.setItem("theme", value);
  applySavedTheme();
}

applySavedTheme();

themeMenuButton.addEventListener("click", function (event) {
  event.stopPropagation();
  themeMenuDropdown.classList.toggle("open");
});

document.addEventListener("click", function () {
  themeMenuDropdown.classList.remove("open");
});

themeDefaultBtn.addEventListener("click", function () {
  saveTheme("default");
  themeMenuDropdown.classList.remove("open");
});

themePastelBtn.addEventListener("click", function () {
  saveTheme("pastel");
  themeMenuDropdown.classList.remove("open");
});

themeDarkBtn.addEventListener("click", function () {
  saveTheme("dark");
  themeMenuDropdown.classList.remove("open");
});

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    resultsMessage.textContent = "Please enter a search term.";
    resultsGrid.innerHTML = "";
    return;
  }

  resultsMessage.textContent = `Showing results for "${query}"`;

  const url = `${API_URL}?api_key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&limit=24&rating=g`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    resultsGrid.innerHTML = "";

    const gifs = Array.isArray(data.data) ? data.data : [];

    if (gifs.length === 0) {
      resultsMessage.textContent = "No GIFs found — try another search ✨";
      return;
    }

    for (let i = 0; i < gifs.length; i++) {
      const gif = gifs[i];
      const img = document.createElement("img");
      img.src = gif.images.fixed_width.url;
      img.alt = gif.title || query;
      resultsGrid.appendChild(img);
    }
  } catch (error) {
    resultsMessage.textContent = "Error loading GIFs. Please try again.";
    resultsGrid.innerHTML = "";
  }
});

