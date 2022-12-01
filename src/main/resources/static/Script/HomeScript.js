function voteForMovie(){
    let movieId = getMovieIdFromAPI(document.getElementById("movieName").value);

    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open("POST","http://localhost:8081/groups/vote/"+"/"+groupID+"/"+movieId);
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.setRequestHeader("Authorization",localStorage.getItem("auth"));
    xmlHttp.onreadystatechange = function (){
        console.log("ready state: ", this.status);
        if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
            getMoviesFromDatabase();
        }
        xmlHttp.send();
    }
    xmlHttp.send();
}

function addMovieToList(){

}

function displayMovies(){
    getMoviesFromDatabase();
}

function getMoviesFromDatabase(){

}

function getMovieIdFromAPI(){

}

function getMoviesFromAPI(){

}
