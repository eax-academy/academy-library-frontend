// UI-related helpers and DOM manipulation utilities

export function createResourceCard(resource) {
  const card = document.createElement('div');
  card.className = 'resource-card';
  card.innerHTML = `
    <img src="assets/placeholder-book.png" alt="Book">
    <h3>${resource.title}</h3>
    <p>${resource.author}</p>
    <p>${resource.tags.join(', ')}</p>
    <button class="btn-view" data-id="${resource.id}">View</button>
    <button class="btn-bookmark" data-id="${resource.id}">Bookmark</button>
  `;
  return card;
}

export function clearGrid() {
  document.getElementById('resource-grid').innerHTML = '';
}
