const apiKey = "";
const backendUrl = "http://20.172.234.66:8081";
let groupID = localStorage.getItem("groupID");

function voteForMovie() {
	let movieId = getMovieIdFromAPI(document.getElementById("movieName").value);

	let xmlHttp = new XMLHttpRequest();

	xmlHttp.open("POST", `${backendUrl}/groups/vote/${groupID}/${movieId}`);
	xmlHttp.setRequestHeader("Authorization", localStorage.getItem("auth"));
	xmlHttp.onreadystatechange = async function () {
		console.log("ready state: ", this.status);
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			await displayMovies();
		}
		xmlHttp.send();
	}
	xmlHttp.send();
}

function addMovieToList() {

    console.log(localStorage.getItem("auth"));
    let movie = getMovieIdFromAPI(document.getElementById(movieName).value);
    //ajax
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:8081/groups/addMovie" + groupID + "/" + movie);
    xmlHttp.setRequestHeader("Authorization",localStorage.getItem("auth"));
    xmlHttp.onreadystatechange = async function (){
        console.log("ready state: ", this.status);
        if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
			await displayMovies();
        }
        xmlHttp.send();
    }
    xmlHttp.send();
}

async function displayMovies() {
	let movies=await getMoviesFromAPI(getMoviesFromDatabase());
	let movieList = document.getElementById("movieList");
	movieList.innerHTML = "";
	for (let movie of movies) {
		let movie_html = "<p> Name: " + movie.title + "<br/> Movie Length: " + movie.runtime + "</p>";
		movieList.innerHTML += movie_html;
	}
}

function getMoviesFromDatabase() {

		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				let movies = JSON.parse(this.responseText);
				return movies;
			}
		}
		xmlHttp.open("GET", `${backendUrl}/${localStorage.getItem("groupId")}/`, true);
		xmlHttp.send();
	}

async function getMoviesFromAPI(movies){
	let movie_list = [];
		for (let movie of movies) {
			movie_list.push(await getMovieDetailsFromAPI(movie.Id));
		}
		return movie_list;
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

async function displaySearchedMovies(){
	let movies= await searchMovieAPI(document.getElementById("movieName"));
	let movieList = document.getElementById("search_list");
	movieList.innerHTML = "<p>";
	for (let movie of movies) {
		let movie_html = "Name: " + movie.title + "<br/> Movie Length: " + movie.runtime + "<br/> Plot: " +movie.plot;
		movieList.innerHTML += movie_html;
	}
	movieList.innerHTML += <p/>
}

function addUserToGroup(){
	let username = document.getElementById("username").value;
	let reponse = document.getElementById("response");
	if(checkIfUserExits(username)!=null){
		xmlHttp.open("POST", `${backendUrl}/groups/addUser/${checkIfUserExits(username).id}/${groupID}`);
		xmlHttp.setRequestHeader("Authorization", localStorage.getItem("auth"));

		reponse.innerHTML = "user added";
	}else{
		reponse.innerHTML = "user does not exsit";
	}
}

function checkIfUserExits(username) {
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			let user = JSON.parse(this.responseText);
			return user;
		}
	}
	xmlHttp.open("GET", `${backendUrl}/user/${username}`, true);
	xmlHttp.send();
	return null;
}