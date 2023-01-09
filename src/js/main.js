


//links to element
const formEl = document.querySelector('#header__form-js');
const containerFilms = document.querySelector('.body__list');
const containerPagination = document.querySelector('#pagination');



//Varibles TDM
const TRAIDIN__URL = 'https://api.themoviedb.org/3/trending/all/day?api_key=45e036602b450491912e4761702a27c4';
const SEARCH__URL = 'https://api.themoviedb.org/3/search/movie?api_key=45e036602b450491912e4761702a27c4&language=en-US&page=1&include_adult=false';

const GENERS__URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=45e036602b450491912e4761702a27c4&language=en-US'
const API__KEY = '45e036602b450491912e4761702a27c4';
const MOVIE__ID = 'https://api.themoviedb.org/3/movie/{movie_id}?api_key=45e036602b450491912e4761702a27c4&language=en-US'
const TRAILER__ID = 'https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=45e036602b450491912e4761702a27c4&language=en-US'

//Form
formEl.addEventListener('submit', clickSubmit);

let searchQery = '';
let totalPages = '';
let currentPages = 1;


function clickSubmit(e) {
    e.preventDefault();
    searchQery = e.target.name.value;
    
}



function renderMainPage() {
	fetch(TRAIDIN__URL)
		.then(r => r.json())
		.then(data => {
			renderMarkUp(data.results)
			renderPaginatinon(data.total_pages);
		})
		
        .catch(error => console.log(error));
    
}



function renderPaginatinon(totalPages) {
	for (let i = 0; i < totalPages; i += 1) {
		if (i < 10) {
	let button = document.createElement('BUTTON');
			button.innerText = i;
			button.setAttribute('data-page', i);
	containerPagination.appendChild(button);
			button.addEventListener('click', function () {
				currentPages = i;
			})
			
		}
	
	}
	
	
}




function renderMarkUp(treandinLibs) {
	const markUp = treandinLibs.map(item => {
		const size = 'w500';
		let IMAGE__BASE = `https://image.tmdb.org/t/p/${size}${item.poster_path}`;
		const DEFAULT__PIC = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
		const dataRelese = new Date(item.release_date).getFullYear();
		console.log(dataRelese);
		function defaultPicture() {
			if (IMAGE__BASE !== `https://image.tmdb.org/t/p/${size}${item.poster_path}`) {
				 return DEFAULT__PIC;
			} 
				  return IMAGE__BASE;
			
		}
		
		return `
				<li class="body__item">
				<a href="" class="body__link">
					<img src="${defaultPicture()}" alt="${item.title}" width='395' height='634'>
				</a>
				<div class="body__deteils">
					<h2 class="body__title">${item.title}</h2>
					<div class="body__info">
						<p class="body__ganre">${item.genre_ids}</p>
						<p class="body__year">${dataRelese}</p>
					</div>
				</div>
			</li>
		`;
	}).join('');
	containerFilms.insertAdjacentHTML('beforeend', markUp);
}


//All functions

renderMainPage();