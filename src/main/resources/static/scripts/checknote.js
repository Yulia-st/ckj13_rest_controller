function Note() {
	let titlev = document.getElementById("title").value
	let messagev = document.getElementById("message").value
	
	
	if (!titlev.match("[A-Za-z0-9]{5,}")) {
		alert("Title should contain at least 5 letters or digits!")
		return false
	}
	
	
	if (!messagev.match("[A-Za-z0-9]{4,}")) {
		alert("Message should contain at least 4 letters or digits!")
		return false
	}
	return true
}