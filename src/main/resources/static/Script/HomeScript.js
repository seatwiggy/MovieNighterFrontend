function voteForMovie(){
    let movieName = document.getElementById("movieName").value;

    let movie = {
        "id":0,
        "name":name,
        "firstVideoAppearance":fva
    }
    //ajax
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:8081/character/");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.setRequestHeader("Authorization",localStorage.getItem("auth"));
    xmlHttp.onreadystatechange = function (){
        console.log("ready state: ", this.status);
        if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
            //the character was created
            console.log("succesfully posted character");
            getCharacters();
        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 401){
            console.log("create failed");
            document.getElementById("characterErrorMessage").innerHTML = "You are not authroized to create a Character, please login";

        } else if(this.readyState == XMLHttpRequest.DONE && this.status == 403){
            document.getElementById("characterErrorMessage").innerHTML = "You do not have the correct permissions to create Characters";
        }
        xmlHttp.send();
    }
    xmlHttp.send(JSON.stringify(vCharacter));
}

function addMovieToList(){

}

function displayMovies(){
    getMoviesFromDatabase();
}

function getMoviesFromDatabase(){

}

function getMoviesFromAPI(){

}
