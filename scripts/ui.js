// UI-related helpers and DOM manipulation utilities

export function createResourceCard(resource) {
  const card = document.createElement('div');
  card.className = 'resource-card';

  card.innerHTML =
  `
    <h3 class="title">${resource.title}</h3>
    <p class="author">${resource.author}</p>
    <p class="tags">${resource.tags.join(', ')}</p>
    <p class="difficulty"><strong>Difficulty:</strong>${resource.difficulty}</p>
    <p class="description">${resource.description}</p>

    <button class="btn-view" data-it="${resource.id}">View Details</button>
  `

  return card;
}

export function clearGrid() {
  document.getElementById('resource-grid').innerHTML = '';
}
