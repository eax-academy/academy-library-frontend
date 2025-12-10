// Handles resource listing and search

//resource listing + search + pagination

import {createResourceCard, clearGrid} from "./ui";

//global state variables
let currentPage = 1;
let limit = 6; //how many card in one page
let totalPages = 1; //information from backend
let currentSearch = "";
let currentDifficulty = "";
let currentAuthor = "";

//DOM elements
const grid = document.getElementById("resource-grid");
const loading = document.getElementById("loading");
const empty = document.getElementById("empty-placeholder");

const pageNumber = document.getElementById("page-number");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");

const searchInput = document.getElementById("search-input");
const filterDifficulty = document.getElementById("filter-difficulty");
const filterAuthor = document.getElementById("filter-author");

//general fetch function - get data from API
async function fetchResources() {
  loading.style.display = "block";
  empty.style.display = "none";
  clearGrid();

  let url = `/api/resources?page=${currentPage}&limit=${limit}`;

  if(currentSearch) url += `&search=${encodeURIComponent(currentSearch)}`; //search filter

  if(currentDifficulty) url += `&difficulty=${currentDifficulty}`; //difficulty filter

  if(currentAuthor) url += `&author=${currentAuthor}`; //author filter

  try {
    const response = await fetch(url);
    const data = await response.json();
    loading.style.display = "none";

    //if backend is empty
    if(!data.items || data.items.length === 0) {
      empty.style.display = "block";
      return;
    }

    //add cards in grid
    data.items.forEach((response) => {
      grid.appendChild(createResourceCard(response));
    });

    //refresh quantity of pages
    totalPages = data.total_page || 1;

    updatePaginationUI();
  } catch(err) {
    console.error(err);
    loading.style.display = "none";
    empty.style.display = "block";
    empty.innerHTML = "Failed to laod resources!";
  }
}

//page change update
function updatePaginationUI() {
  pageNumber.innerText = currentPage;
  prevBtn.disabled = currentPage === 1; //if the firts page
  nextBtn.disabled = currentPage === totalPages; //if the last page
}

//event listeners - prev/next
prevBtn.addEventListener("click", () => {
  if(currentPage > 1) {
    currentPage--;
    fetchResources();
  }
});

nextBtn.addEventListener("click", () => {
  if(currentPage < totalPages){
    currentPage++;
    fetchResources();
  }
});

//event listener - search input
searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.toLowerCase();
  currentPage = 1;
  fetchResources();
});

filterDifficulty.addEventListener("change", () => {
  currentDifficulty = filterDifficulty.value;
  currentPage = 1;
  fetchResources();
});

filterAuthor.addEventListener("change", () => {
  currentAuthor = filterAuthor.value;
  currentPage = 1;
  fetchResources();
})

document.addEventListener("DOMContentLoaded", () => {
  fetchResources();
})










let resources = []; //that will be filled from API

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('resource-grid');
  const loading = document.getElementById('loading');

  loading.style.display = 'block'; // loading show

  // fetch real API data
  try {
    const response = await fetch(`/api/resources?page=${currentPage}&limit=6`);
    const data = await response.json();

    resources = Array.isArray(data) ? data : [];

  } catch (err) {
    console.err("Failed to load resorces:", err);
    resources = [];
  }

  loading.style.display = 'none'; //loading hide

  if(resources.length === 0) {
    grid.innerHTML = `<p class="empty-msg">No resources found!</p>`;
    return;
  }

  //render
  resources.forEach(r => grid.appendChild(createResourceCard(r)));

  // function search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    const filtered = resources.filter(r => 
      r.title.toLowerCase().includes(query) ||
      r.author.toLowerCase().includes(query) ||
      r.tags.join(',').toLowerCase().includes(query) ||
      (r.description || '').toLowerCase().includes(query)
    );

    clearGrid();

    if(filtered.length === 0) {
      grid.innerHTML = `<p class="empty-msg">No matching resources!</p`;
    } else {
      filtered.forEach(r => grid.appendChild(createResourceCard(r)));
    }
  });
});