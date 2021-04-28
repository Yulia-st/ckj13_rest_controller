function checkForm() {
	
	
	let usernm = document.getElementById("username").value
	let lastnm = document.getElementById("lastname").value
	let agev = document.getElementById("age").value
	let password = document.getElementById("psw").value
	let confirmPassword = document.getElementById("confirm-psw").value
	let eladrs = document.getElementById("email").value
	
	if (!usernm.match("[A-Za-z]{1,}")) {
		alert("Firstname should contain at least 1 letter!")
		return false
	}
	if (!lastnm.match("[A-Za-z]{1,}")) {
		alert("Lastname should contain at least 1 letter!")
		return false
	}
	if (!agev.match("[0-9]{2,}")) {
		alert("Age should contain at least 2 digits!")
		return false
	}
	if (agev<18||agev>120){
		alert("Age should be between 18-120!")
		return false
	}
	
	if (!password.match("[A-Za-z0-9]{8,}")) {
		alert("Password should contain at least 8 letters or digits!")
		return false
	}
	if (!confirmPassword.match("[A-Za-z0-9]{8,}")) {
		alert("Confirm password should contain at least 8 letters or digits!")
		return false
	}
	if (password != confirmPassword) {
		alert("Password is not confirmed!")
		return false
	}
	if (!eladrs.match("[a-z0-9]{1,}@[a-z]{1,}[.][a-z]{3}")) {
		alert("To write Email follow: my123@example.com!")
		return false
	}
	return true
}

