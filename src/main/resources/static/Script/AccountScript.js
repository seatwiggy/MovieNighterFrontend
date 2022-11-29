function updateUser(){
    const username = document.getElementById("username").value;
    const contactInfo = document.getElementById("contact_info").value;
    const contactInfoType = document.getElementById("contact_info_type").value;
    const id = getUserID();
    let password;
    if(document.getElementById("password")===document.getElementById("password_check")){
        password = document.getElementById("password").value;
        document.getElementById("response").innerHTML = "The passwords you entered do not match";
    }
    const user = {
        "id":id,
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
    xmlHttp.open("PUT","http://localhost:8082/users/"+id);
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

function getUserID(username){
    console.log("find");
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function (){
        if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
            let user = JSON.parse(this.responseText);
            if(user!=null){
                return user.id;
            }
        }
    }
    xmlHttp.open("GET","http://localhost:8082/user/"+username,true);
    xmlHttp.send();
}