const navButton = document.querySelector('#nav-button');
const navlink = document.querySelector(".navigation")

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navlink.classList.toggle("show");
});


// const gridButton = document.querySelector("#grid");
// const listButton = document.querySelector("#list");
// const members = document.querySelector("#members");

// gridButton.addEventListener("click", () => {
//     members.classList.add("grid");
//     members.classList.remove("list");
// });

// listButton.addEventListener("click", () => {
//     members.classList.add("list");
//     members.classList.remove("grid");
// });