// Handles sidebar filters (author, difficulty, tags)
document.addEventListener('DOMContentLoaded', () => {
  const difficultySelect = document.getElementById('filter-difficulty');
  const authorSelect = document.getElementById('filter-author');
  const tagsContainer = document.getElementById('filter-tags');

  // TODO: Populate these dynamically from available resources
  // For now, placeholders:
  authorSelect.innerHTML += '<option value="Robert C. Martin">Robert C. Martin</option>';
  authorSelect.innerHTML += '<option value="Thomas H. Cormen">Thomas H. Cormen</option>';

  const tags = ['Software Engineering', 'Algorithms', 'Computer Science', 'Frontend'];
  tags.forEach(tag => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${tag}"> ${tag}`;
    tagsContainer.appendChild(label);
  });
});
