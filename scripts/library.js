// Handles resource listing and search

import { createResourceCard, clearGrid } from './ui.js';

const resources = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    tags: ['Software Engineering', 'Best Practices'],
    difficulty: 'Intermediate',
    description: 'A guide to writing clean, maintainable code.'
  },
  {
    id: 2,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    tags: ['Algorithms', 'Computer Science'],
    difficulty: 'Advanced',
    description: 'Comprehensive algorithm theory and implementation guide.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('resource-grid');
  resources.forEach(r => grid.appendChild(createResourceCard(r)));

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = resources.filter(r =>
      r.title.toLowerCase().includes(query) ||
      r.author.toLowerCase().includes(query) ||
      r.tags.join(',').toLowerCase().includes(query)
    );
    clearGrid();
    filtered.forEach(r => grid.appendChild(createResourceCard(r)));
  });
});
