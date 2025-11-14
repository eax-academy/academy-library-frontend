// Handles bookmarking and My Library section

const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

document.addEventListener('click', e => {
  if (e.target.classList.contains('btn-bookmark')) {
    const id = e.target.dataset.id;
    toggleBookmark(id);
  }
});

function toggleBookmark(id) {
  const index = bookmarks.indexOf(id);
  if (index === -1) bookmarks.push(id);
  else bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export function renderBookmarks(resources) {
  const container = document.getElementById('bookmarks-container');
  container.innerHTML = '';
  const saved = resources.filter(r => bookmarks.includes(String(r.id)));
  saved.forEach(r => {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
      <img src="assets/placeholder-book.png" alt="Book">
      <h3>${r.title}</h3>
      <p>${r.author}</p>
    `;
    container.appendChild(card);
  });
}
