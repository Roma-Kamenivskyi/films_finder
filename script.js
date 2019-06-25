// variables
const searchForm = document.getElementById('searchForm'),
      movie = document.querySelector('.movies');

// Event listeners
searchForm.addEventListener('submit', apiSearch);

// Functions

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    if(searchText.trim().length === 0) {
        return;
    }
    
    const server = 'https://api.themoviedb.org/3/search/movie?api_key=f58b7aed07949c396b8a76edb193b481&language=en-US&query=' + searchText;
    requestApi('GET', server);
}


function requestApi(method, url) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.addEventListener('load', () => {
    if (xhr.status == 200 && xhr.readyState == 4) {
        const output = JSON.parse(xhr.responseText);
        let inner = '';

        // If not founds results
        if(output.results.length === 0){
            inner = `<h3 class="m-auto text-info"> Not found!</h3>`;
        }
        console.log(output);
        output.results.forEach(item => {
            if (item.overview == '' && item.poster_path == null) {
            }

            if(item.poster_path == null || item.poster_path == 'undefined') {
                posterImg = "posterNotFound.png";
            } 
            else {
                posterImg = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            }

            let nameItem = item.name || item.title;
            let dateRelease = item.first_air_date || item.release_date;
                
            inner += 
            `<div class="col-12 col-sm-6 col-md-4 col-xl-3 mb-5 item-wrap">
                <div class="item">
                    <img class="mb-3" src="${posterImg}" alt="${nameItem}">
                    <h5 class="title">${nameItem} </h5>
                    <p>Release date: ${dateRelease}</p>
                </div>
            </div>`;
        });
        movie.innerHTML = inner;

        const mediaItem  = document.querySelectorAll('.item-wrap');

        mediaItem.forEach(function(item){
            item.addEventListener('click', showFullInfo);
        });
    }
    });
}

function showFullInfo() {

}

document.addEventListener('DOMContentLoaded', () => {
    let trands = 'https://api.themoviedb.org/3/trending/all/week?api_key=f58b7aed07949c396b8a76edb193b481';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', trands);
    xhr.send();

    xhr.addEventListener('load', () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            const output = JSON.parse(xhr.responseText);
            let inner = '<h2 class="col-12 mb-5 text-dark"> Popular for a week </h2>';

            // If not founds results
            if(output.results.length === 0){
                inner = `<h3 class="m-auto text-info"> Not found!</h3>`;
            }

            output.results.forEach(item => {
                if (item.overview == '' && item.poster_path == null) {
                    
                }

                if(item.poster_path == null || item.poster_path == 'undefined') {
                    posterImg = "posterNotFound.png";
                } 
                else {
                    posterImg = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
                }

                let nameItem = item.name || item.title;
                let dateRelease = item.first_air_date || item.release_date;
                    
                inner += 
                `<div class="col-12 col-sm-6 col-md-4 col-xl-3 mb-5 item-wrap">
                    <div class="item">
                        <img class="mb-3" src="${posterImg}" alt="${nameItem}">
                        <h5 class="title">${nameItem} </h5>
                        <p>Release date: ${dateRelease}</p>
                    </div>
                </div>`
            });
            movie.innerHTML = inner;

            const mediaItem  = document.querySelectorAll('.item-wrap');

            mediaItem.forEach(function(item){
                item.addEventListener('click', showFullInfo);
            });
        }
    });
});


