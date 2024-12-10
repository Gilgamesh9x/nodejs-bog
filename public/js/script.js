/* document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.querySelector("#searchInput");
  const searchClose = document.querySelector("#searchClose");
}); */

const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.querySelector(".searchBar");
const searchInput = document.querySelector("#searchInput");
const searchClose = document.querySelector("#searchClose");

searchBtn.addEventListener("click", function () {
  searchBar.style.visibility = "visible";
  searchBar.classList.add("open");
  this.setAttribute("aria-expanded", "true");
  searchInput.focus();
});

searchClose.addEventListener("click", function () {
  searchBar.style.visibility = "hidden";
  searchBar.classList.remove("open");
  this.setAttribute("aria-expanded", "false");
});
