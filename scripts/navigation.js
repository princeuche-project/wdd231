const navButton = document.querySelector('#nav-button');
const navlink = document.querySelector("#nav-bar")

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navlink.classList.toggle("show");
});