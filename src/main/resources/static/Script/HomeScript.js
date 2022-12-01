const apiKey = "";

function voteForMovie() {
	let movieId = getMovieIdFromAPI(document.getElementById("movieName").value);

	let xmlHttp = new XMLHttpRequest();

	xmlHttp.open("POST", "http://localhost:8081/groups/vote/" + "/" + groupID + "/" + movieId);
	xmlHttp.setRequestHeader("Content-Type", "application/json");
	xmlHttp.setRequestHeader("Authorization", localStorage.getItem("auth"));
	xmlHttp.onreadystatechange = function () {
		console.log("ready state: ", this.status);
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			getMoviesFromDatabase();
		}
		xmlHttp.send();
	}
	xmlHttp.send();
}

function addMovieToList() {

}

function displayMovies(movies) {
	let movieList = document.getElementById("movieList");
	movieList.innerHTML = "";
	for (let movie of movies) {
		let movie_html = "<p> Name: " + movie.title + "<br/> Movie Length: " + movie.movieLength + "</p>";
		movieList.innerHTML += movie_html;
	}
}

function getMoviesFromDatabase() {
	function getMoviesFromDatabase() {
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				let movies = JSON.parse(this.responseText);
				displayMovies(getMoviesFromAPI(movies));
			}
		}
		xmlHttp.open("GET", "http://localhost:8081/character/", true);
		xmlHttp.send();
	}

	async function getMovieIdFromAPI(title) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
			.then(response => response.json())
			.then(data => {
				return data.imdbID;
			})
	}

	async function getMovieDetailsFromAPI(movieId) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
			.then(response => response.json())
			.then(data => {
				return data;
			})
	}

	async function searchMovieAPI(search) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
			.then(response => response.json())
			.then(data => {
				return data;
			})
	}
}
