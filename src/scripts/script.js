// global variables
const searchForm = document.getElementById("searchForm");
const moviesWrapper = document.querySelector(".movies");
const homePageLink = document.querySelector(".home-link");

const API_KEY = "f58b7aed07949c396b8a76edb193b481";
const api_poster = "https://image.tmdb.org/t/p/w500";
const trandsUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
const notFound = '<h3 class="m-auto text-warning"> Not found!</h3>';
const popularTitle =
  '<h2 class="col-12 mb-5 text-dark"> Popular for a week </h2>';

// Event listeners
searchForm.addEventListener("submit", searchMovies);
homePageLink.addEventListener("click", renderHomePage);
document.addEventListener("DOMContentLoaded", renderHomePage);

// Functions
function renderHomePage(event) {
  event.preventDefault();
  fetchData(trandsUrl, popularTitle);
}

function searchMovies(event) {
  event.preventDefault();
  const searchText = document.querySelector("#searchText").value;
  const server = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}`;
  if (!searchText.trim().length) {
    return;
  }
  fetchData(server);
}

function fetchData(url, additional = "") {
  moviesWrapper.innerHTML = '<div class="spin"></div>';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      return renderMovieCards(data);
    })
    .then(data => {
      moviesWrapper.innerHTML = data;
      moviesWrapper.insertAdjacentHTML("afterbegin", additional);
    })
    .catch(err => console.log("Error: ", err));
}

function renderMovieCards({ results }) {
  let output = "";
  results.forEach(({ poster_path, title, release_date, id }) => {
    const poster = `${api_poster}${poster_path}`;
    output += `
    <div class="col-12 col-sm-6 col-md-4 col-xl-3 mb-5 item-wrap" data-id="${id}">
      <div class="item">
        <img class="mb-3" 
          src="${poster_path ? poster : "/posterNotFound.png"}"
          alt="${title}"
        />
        <h5 class="title">${title}</h5>
        <p>Release date: ${release_date || "unknown"}</p>
      </div>
    </div>`;
  });
  return output || notFound;
}

function showFullInfo() {}
