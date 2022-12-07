const backendUrl = "http://20.172.234.66:8081";

/*
function updateUser() {
	const username = document.getElementById("username").value;
	const contactInfo = document.getElementById("contact_info").value;
	const contactInfoType = document.getElementById("contact_info_type").value;
	const id = getUserID();
	let password;
	if (document.getElementById("password") === document.getElementById("password_check")) {
		password = document.getElementById("password").value;
		document.getElementById("response").innerHTML = "The passwords you entered do not match";
	}
	const user = {
		"id": id,
		"username": username,
		"password": password,
		"contactInfo": contactInfo,
		"contactInfoType": contactInfoType
	};
	let bool = checkIfUserAlreadyExits(username);
	if (bool == true) {
		document.getElementById("response").innerHTML = "This username is already in use";
	}
	const xmlHttp = new XMLHttpRequest();
	xmlHttp.open("PUT", `${backendUrl}/users/${id}`);
	xmlHttp.setRequestHeader("Content-Type", "application/json");
	xmlHttp.onreadystatechange = function () {
		console.log("ready state: ", this.status);
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			console.log("succesfully posted user");
			document.getElementById("response").innerHTML = "Welcome" + username;
		}
	}

	xmlHttp.send(JSON.stringify(user));
}
*/
function updateUserUsername() {
    const username = document.getElementById("new_username").value;
    const id = getUserID(document.getElementById("username").value);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", `${backendUrl}/user/${id}/${username}`);
    xmlHttp.onreadystatechange = function () {
        console.log("ready state: ", this.status);

    }
    xmlHttp.send();
}

function updateUserPassword() {
	const password = document.getElementById("password").value;
	const id = getUserID(document.getElementById("username").value);

	const xmlHttp = new XMLHttpRequest();
	xmlHttp.open("PUT", `${backendUrl}/user/updatePassword/${id}/${password}`);
	xmlHttp.onreadystatechange = function () {
		console.log("ready state: ", this.status);

	}
	xmlHttp.send();
}

function updateUserContactInfo() {
	const contactInfo = document.getElementById("contactInfo").value;
	const id = getUserID(document.getElementById("username").value);

	const xmlHttp = new XMLHttpRequest();
	xmlHttp.open("PUT", `${backendUrl}/user/updateContactInfo/${id}/${contactInfo}`);
	xmlHttp.onreadystatechange = function () {
		console.log("ready state: ", this.status);

	}
	xmlHttp.send();
}

function updateUserContactInfoType() {
	const contactInfoType = document.getElementById("contactInfoType").value;
	const id = getUserID(document.getElementById("username").value);

	const xmlHttp = new XMLHttpRequest();
	xmlHttp.open("PUT", `${backendUrl}/user/updateContactInfoType/${id}/${contactInfoType}`);
	xmlHttp.onreadystatechange = function () {
		console.log("ready state: ", this.status);

	}
	xmlHttp.send();
}

function getUserID(username) {
	console.log("find");
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			let user = JSON.parse(this.responseText);
			if (user != null) {
				return user.id;
			}
		}
	}
	xmlHttp.open("GET", `${backendUrl}/user/${username}`, true);
	xmlHttp.send();
}

function getGroups(){
	const id = getUserID(document.getElementById("username").value);
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function (){
		if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
			let groups = JSON.parse(this.responseText);
			return groups;
		}
	}
	xmlHttp.open("GET",`${backendUrl}/user/getGroups/${id}`,true);
	xmlHttp.setRequestHeader("Authorization",localStorage.getItem("authHeader"));
	xmlHttp.send();
}

function getGroup(name){

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function (){
		if(this.readyState == XMLHttpRequest.DONE && this.status ==200){
			let group = JSON.parse(this.responseText);
			return group;
		}
	}
	xmlHttp.open("GET",`${backendUrl}/group/getGroup/${name}`,true);
	xmlHttp.setRequestHeader("Authorization",localStorage.getItem("authHeader"));
	xmlHttp.send();
}

function setGroup(id){
	let groupName = document.getElementById(id).innerHTML;
	let group = getGroup(groupName);
	localStorage.setItem("groupId",group.id);

}

function displayGroups(){
	let group_list = document.getElementById("groups");
	group_list.innerHTML = "";
	groups = getGroups();
	let num=0;
	for (let group of groups){
		let elementId = "p"+num
		let group_html = `<p id="${elementId}" onclick="setGroup(${elementId})" > ${group.name}</p>`;
		num++;
		group_list.innerHTML +=group_html;
	}
}

function displayUserName(){
	let name = localStorage.getItem("authHeader");
	name = atob(name);
	name = name.split(":");
	name = name.slice(5);
	document.getElementById("username").innerHTML = name;
}

function createGroup(){
	let name = document.getElementById("group_name").value;
	let userId = getUserID(document.getElementById("username").value);
	const xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", `${backendUrl}/group/${name}/${userId}`);

	xmlHttp.onreadystatechange = function () {
		console.log("ready state: ", this.status);
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			displayGroups();

		}
	}
	xmlHttp.send();
}

window.onload = function (){
	displayGroups();
	displayUserName();
}
