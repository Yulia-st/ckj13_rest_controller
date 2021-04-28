//async function searchNotes(word) {
async function searchNotes() {
	let url = "/api/search"
	let responsen = await fetch(url)
	let notes
	if (responsen.ok) {
		notes = await responsen.json()
	} else {
		console.log(responsen.status)
	}

	let word = document.getElementById("search").value
	console.log(word)
	for (note of notes) {
		if (note.title == word) {
			
			alert("Note was found")
			console.log(note)
			return true
		}
		if (note.message == word) {
			
			alert("Note was found")
			return true
		}else {
			alert("No one note was found")
			return false
		}
return true
	}
//form.submit()
}

async function submitFormSearch() {
	let form = document.getElementById("search_form")
	//дождаться проверки формы и отправить форму вручную
	if (await searchNotes()) {
		//отправлю форму
		form.submit()
	}
	
}