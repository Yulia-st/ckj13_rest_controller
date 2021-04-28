async function deleteNote() {
	let url = "/api/notes"
	let response = await fetch(url,
		{
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
}


function noteInfo(event) {
	let somevar = event.target;
	if (confirm('Data of note will not be allowed to edit. Continue?')) {
		window.location.href = "/notes/info.html"
		return true;
	}

}

function noteDelete(event) {
	let somevar = event.target;
	confirm('Delete?')

	//if (confirm('Delete?')) {

	//	window.location.href = "/white.html"
	//	return true;
	//}
}


function noteEdit() {
	alert('Data of note allowed to edit!')

}


async function arrNotes() {
	let url = "/api/notes"
	let responsen = await fetch(url)
	let notes = await responsen.json()

	//получение данных из сервера и вывод статуса в консоль

	//let url = "/api/notes"
	//let responsen = await fetch(url)
	//let notes
	//if (responsen.ok) {
	//	notes = await responsen.json()
	//} else {
	//	console.log(responsen.status)
	//}

	//вывод в консоль, времменно закомментирован

	//for (note of notes) {
	//	console.log(note)
	//}
	notes.forEach(el => {
		//let div = document.createElement("div")
		//div.classList.add("containerNotes")
		let div0 = document.getElementById("notes")

		let divcont = document.createElement("div")
		divcont.classList.add("containerNotes")
		div0.appendChild(divcont)

		//let dash = document.getElementById("bord")
		//id.classList.add("containerNotes")
		//let textx = dash.textContent
		//divcont.text =textx

		let id = document.createElement("div")
		//id.classList.add("containerNotes")
		id.innerText = el.id
		divcont.appendChild(id)

		let title = document.createElement("div")
		title.innerText = el.title
		//div0.appendChild(title)
		div0.appendChild(title)

		let message = document.createElement("div")
		message.innerText = el.message
		//div0.appendChild(message)
		divcont.appendChild(title)


		let startDate = document.createElement("div")
		startDate.innerText = el.startDate
		//div0.appendChild(startDate)
		divcont.appendChild(startDate)

		let myinfo = document.createElement("a")
		myinfo.innerText = "Info"
		//myinfo.addEventListener("click", noteInfo)
		//myinfo.href = el.links[0].href
		myinfo.href = "/api/notes/" + el.id
		//div0.appendChild(myinfo)
		divcont.appendChild(myinfo)


		let adelete = document.createElement("a")
		adelete.innerText = "Delete"
		//adelete.addEventListener("click", noteDelete)
		//adelete.href = el.links[0].href
		adelete.onclick = async function() {
			if (confirm("Delete?")) {
				let url = el.links[0].href
				let response = await fetch(url,
					{
						method: "DELETE"

					})
			}
		}
			//div0.appendChild(adelete)
			divcont.appendChild(adelete)

			let aedit = document.createElement("a")
			aedit.innerText = "Edit"
			aedit.addEventListener("click", noteEdit)
			//aedit.style.borderBottomColor = "red"
			//aedit.style.borderBottom = "1px dashed"
			aedit.href = el.links[0].href
			//div0.appendChild(aedit)
			divcont.appendChild(aedit)

			/////green line
			//let linedash = document.createElement("div")
			//linedash.style.borderBottomColor = "green"
			//linedash.style.borderBottomStyle = "dashed"
			//div0.appendChild(linedash)

			document.querySelector("body").appendChild(div0)

		})

}

function elemShow(someArr) {

	let div0 = document.getElementById("notes")
	//div0.classList.add("containerNotes")
	//let div = document.createElement("div")



	let id = document.createElement("div")
	id.innerText = someArr.id
	div0.appendChild(id)

	let title = document.createElement("div")
	title.innerText = someArr.title
	div0.appendChild(title)

	let message = document.createElement("div")
	message.innerText = someArr.message
	div0.appendChild(message)

	let startDate = document.createElement("div")
	startDate.innerText = someArr.startDate
	div0.appendChild(startDate)

	let myinfo = document.createElement("a")
	myinfo.innerText = "Info"
	//myinfo.addEventListener("click", noteInfo)
	//myinfo.href = 
	div0.appendChild(myinfo)

	let adelete = document.createElement("a")
	adelete.innerText = "Delete"
	//adelete.addEventListener("click", noteDelete)
	//adelete.href = someArr.links[0].href
	div0.appendChild(adelete)

	let aedit = document.createElement("a")
	aedit.innerText = "Edit"
	//aedit.addEventListener("click", noteEdit)
	//aedit.style.borderBottomColor = "red"
	//aedit.style.borderBottom = "1px dashed"
	//aedit.href = someArr.links[0].href
	div0.appendChild(aedit)

	let linedash = document.createElement("div")
	linedash.style.borderBottomColor = "green"
	linedash.style.borderBottomStyle = "dashed"
	div0.appendChild(linedash)

	document.querySelector("body").appendChild(div0)


}

function elemUnShow(newArr) {

	let div0 = document.getElementById("notes")
	//div0.classList.add("containerNotes")
	//let div = document.createElement("div")



	let id = document.createElement("div")
	id.innerText = newArr.id
	div0.removeChild(id)

	let title = document.createElement("div")
	title.innerText = newArr.title
	div0.removeChild(title)

	let message = document.createElement("div")
	message.innerText = newArr.message
	div0.removeChild(message)

	let startDate = document.createElement("div")
	startDate.innerText = newArr.startDate
	div0.removeChild(startDate)

	let myinfo = document.createElement("a")
	myinfo.innerText = "Info"
	//myinfo.addEventListener("click", noteInfo)
	//myinfo.href = 
	div0.removeChild(myinfo)

	let adelete = document.createElement("a")
	adelete.innerText = "Delete"
	//adelete.addEventListener("click", noteDelete)
	//adelete.href = someArr.links[0].href
	div0.removeChild(adelete)

	let aedit = document.createElement("a")
	aedit.innerText = "Edit"
	//aedit.addEventListener("click", noteEdit)
	//aedit.style.borderBottomColor = "red"
	//aedit.style.borderBottom = "1px dashed"
	//aedit.href = someArr.links[0].href
	div0.removeChild(aedit)

	let linedash = document.createElement("div")
	linedash.style.borderBottomColor = "green"
	linedash.style.borderBottomStyle = "dashed"
	div0.removeChild(linedash)

	//document.querySelector("body").removeChild(div0)


}

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

	//for (note of notes) {
	//	console.log(note)
	//}
	let word = document.getElementById("search").value
	let n = 0
	console.log(word)
	for (note of notes) {
		//elemUnShow(note)
		if (note.title == word) {
			elemShow(note)
			console.log(note)
			n++
		}
		else if (note.message == word) {
			elemShow(note)
			//alert("Note.message exist")
			console.log(note)
			n++
		}
		//elemShow(note)

	}

	if (n == 0) {
		alert("No one note was found")
		return false
	} else {
		console.log("n = " + n)
		return true
	}
	//elemShow(note)
}

async function submitFormSearch() {
	let form = document.getElementById("search_form")
	//дождаться проверки формы и отправить форму вручную
	if (await searchNotes()) {
		//отправлю форму
		form.submit()
	}

}
//searchNotes()
arrNotes()