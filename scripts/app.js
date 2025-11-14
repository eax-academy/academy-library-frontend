// Handles navigation between main views
document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.view');
  const buttons = document.querySelectorAll('header nav button');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.id.replace('btn-', '') + '-section';
      views.forEach(v => v.classList.remove('active'));
      document.getElementById(target).classList.add('active');
    });
  });
});
