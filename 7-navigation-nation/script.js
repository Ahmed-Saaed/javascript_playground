const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

function navAnimation(direction1, direction2) {
  navItems.forEach((nav, index) => {
    nav.classList.replace(
      `slide-${direction1}-${index + 1}`,
      `slide-${direction2}-${index + 1}`
    );
  });
}

function toggleNav() {
  // toggle: Ment Bars Open/Closed
  menuBars.classList.toggle('change');
  // toggle: Menu Active
  overlay.classList.toggle('overlay-active');

  if (overlay.classList.contains('overlay-active')) {
    //Animate In - Overlay
    // overlay.classList.remove('overlay-slide-left');
    // overlay.classList.add('overlay-slide-right');

    // you can use Replace
    //TODO: you have to add overlay slide-left as a default to the html
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

    navAnimation('out', 'in');
  } else {
    //Animate Out - Overlay
    // overlay.classList.remove('overlay-slide-right');
    // overlay.classList.add('overlay-slide-left');
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

    // Animate out - Nav items
    navAnimation('in', 'out');
  }
}

// Event listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
