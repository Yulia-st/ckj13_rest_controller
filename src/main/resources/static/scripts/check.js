async function checkForm() {
	let url = "/api/users"
	let response = await fetch(url)
	let users
	if (response.ok) {
		users = await response.json()
	} else {
		console.log(response.status)
	}
	//проверить, что username и email свободен
	let usernamejs = document.getElementById("username").value
	let emailjs = document.getElementById("email").value
	//for (i = 0; i < users.length; i++) {

	//	if (users.username[i] == usernamejs) {
	//		alert("This username exists")
	//		return false
	//	}
	//	if (users.email[i] == emailjs) {
	//		alert("This email exists")
	//		return false
	//	}
	//}
	for (user of users) {
		if (user.username == usernamejs) {
			alert("This username exists")
			return false
		}
		if (user.email == emailjs) {
			alert("This email exists")
			return false
		}
	}
	let password = document.getElementById("psw").value
	let confirmPassword = document.getElementById("confirm-psw").value
	let usernm = document.getElementById("username").value
	let eladrs = document.getElementById("email").value
	if (!usernm.match("[A-Za-z0-9]+")) {
		alert("Username should contain at least 1 letter or digit!")
		return false
	}
	if (!password.match("[A-Za-z0-9]{8,}")) {
		alert("Password should contain at least 8 letters and digits!")
		return false
	}
	if (password != confirmPassword) {
		//console.log("Password confirmed!")
		//return true
		//}else{
		alert("Password is not confirmed!")
		return false
	}
	return true
}

async function submitForm() {
	let form = document.getElementById("signup_form")
	//дождаться проверки формы и отправить форму вручную
	if (await checkForm()) {
		//отправлю форму
		form.submit()
	}
	//if(confirm("Submit registration?")){
	//	console.log("Check form and send registration request...")
	//}
}