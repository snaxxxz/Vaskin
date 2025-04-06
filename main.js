document.addEventListener('DOMContentLoaded', function() {

  const filterButtons = document.querySelectorAll('.filter-button');
  const productCards = document.querySelectorAll('.itemCardProduct_mainBlock');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const gender = this.dataset.gender;

      productCards.forEach(card => {
        if (gender === 'all' || card.dataset.gender === gender) {
            card.style.opacity = 1; // Показываем
            card.style.display = 'block'; // Важно показать блок (если он был скрыт)
        } else {
            card.style.opacity = 0; // Скрываем (делаем прозрачным)
            setTimeout(() => {
              card.style.display = 'none'; // После задержки скрываем, чтобы не занимало место
            }, 300); // Задержка в 300 мс (равна времени перехода)
        }
      });
    });
  });

});