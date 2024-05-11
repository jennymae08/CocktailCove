const trigger = document.querySelectorAll('nav li');
const circle = document.querySelector('.bot-nav nav li.circle');

trigger.forEach((menu) => menu.addEventListener('click', toggle));

function toggle() {
  trigger.forEach((item) => item != this ? item.classList.remove('active') : null);
  if (!this.classList.contains('active')) {
    this.classList.toggle('active');
    const index = Array.from(trigger).indexOf(this);
    moveCircle(index);
  }
}

function moveCircle(index) {
  const activeIcon = document.querySelectorAll('.bot-nav nav li i')[index];
  const activeIconRect = activeIcon.getBoundingClientRect();
  circle.style.left = `${activeIconRect.left + (activeIconRect.width / 2)}px`;
}
