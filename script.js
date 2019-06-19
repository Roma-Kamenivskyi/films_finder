// variables
const searchForm = document.getElementById('searchForm'),
      movie = document.querySelector('.movies');

// Event listeners
searchForm.addEventListener('submit', apiSearch);

// Functions

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=f58b7aed07949c396b8a76edb193b481&language=ru&query=' + searchText;
    requestApi('GET', server);
}


function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.status == 200 && request.readyState == 4) {
            const output = JSON.parse(request.responseText);
            let inner = '';
            output.results.forEach(item => {
                let nameItem = item.name || item.title,
                    dateRelease = item.first_air_date || item.release_date;
                    
                inner += `<div class="col-6 col-md-4 col-xl-3">${nameItem} <br> Дата релиза: ${dateRelease}</div>`
            });
            movie.innerHTML = inner;
        }
    });
}