function createUser(){
    const username = document.getElementById("username").value;
    const contactInfo = document.getElementById("contact_info").value;
    const contactInfoType = document.getElementById("contact_info_type").value;
    let password;
    if(document.getElementById("password")===document.getElementById("password_check")){
        password = document.getElementById("password").value;
        document.getElementById("response").innerHTML = "The passwords you entered do not match";
    }
    const user = {
        "username": username,
        "password": password,
        "contactInfo": contactInfo,
        "contactInfoType": contactInfoType
    };
    let bool = checkIfUserAlreadyExits(username);
    if(bool == true){
        document.getElementById("response").innerHTML = "This username is already in use";
    }
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:8081/users/");
    xmlHttp.setRequestHeader("Content-Type","application/json");
    xmlHttp.onreadystatechange = function (){
        console.log("ready state: ", this.status);
        if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
            console.log("succesfully posted user");
            document.getElementById("response").innerHTML = "Welcome"+username;
        }
    }
    xmlHttp.send(JSON.stringify(user));
}

//returns true if user exists returns false if user does not exist
function checkIfUserAlreadyExits(username){
    console.log("find");
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function (){
        if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
            let user = JSON.parse(this.responseText);
            if(user!=null){
                return true;
            }
            else return false;
        }
    }
    xmlHttp.open("GET","http://localhost:8081/user/"+username,true);
    xmlHttp.send();
}
