const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

//Dark or Light Images
function imagesMode(color) {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleDarkLightMode(theme) {
  nav.style.backgroundColor =
    theme === LIGHT_THEME ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
  textBox.style.backgroundColor =
    theme === LIGHT_THEME ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
  toggleIcon.children[0].textContent =
    theme === LIGHT_THEME ? 'Light Mode' : 'Dark Mode';
  theme === LIGHT_THEME
    ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun')
    : toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');

  theme === LIGHT_THEME ? imagesMode(LIGHT_THEME) : imagesMode(DARK_THEME);
}

//Dark Mode Styles
// function darkMode() {
//   nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//   textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//   toggleIcon.children[0].textContent = 'Dark Mode';
//   toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
//   imagesMode(DARK_THEME);
// }

// // Light Mode Styles
// function lightMode() {
//   nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//   textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//   toggleIcon.children[0].textContent = 'Light Mode';
//   toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//   imagesMode(LIGHT_THEME);
// }

//Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', DARK_THEME);
    localStorage.setItem('theme', DARK_THEME);
    // darkMode();
    toggleDarkLightMode(false);
  } else {
    document.documentElement.setAttribute('data-theme', LIGHT_THEME);
    localStorage.setItem('theme', LIGHT_THEME);
    // lightMode();
    toggleDarkLightMode(true);
  }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

//Check Local Storae For Theme

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === DARK_THEME) {
    toggleSwitch.checked = true;
    // darkMode();
    toggleDarkLightMode(DARK_THEME);
  } else {
    toggleSwitch.checked = false;
    // lightMode();
    toggleDarkLightMode(LIGHT_THEME);
  }
}
console.log(currentTheme);
