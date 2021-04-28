arrNotes()

async function saveNote() {
	let title = document.getElementById("title").value
	let message = document.getElementById("message").value
	let note = { title: title, message: message }

	let url = "/api/notes"
	let response = await fetch(url,
		{
			method: "POST",
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(note)
		})

	let reslt = await response.json()

	return reslt
}





///поиск по названию заметки: title or message
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
	let n = 0
	console.log(word)
	for (note of notes) {
		if (((note.title).toLowerCase()).includes(word)) {
			let div0 = document.getElementById("notes")
			if (div0) {
				div0.remove()
			}
			elemShow(note)

			console.log(note)
			n++
		}
		else if (((note.message).toLowerCase()).includes(word)) {
			let div0 = document.getElementById("notes")
			if (div0) {
				div0.remove()
			}
			elemShow(note)

			console.log(note)
			n++
		}
	}

	if (n == 0) {
		alert("No one note was found")
		return false
	} else {
		console.log("n = " + n)
		return true
	}
}
async function getNotesFromServer() {

	let url = "/api/notes"
	let response = await fetch(url)
	let notes
	if (response.ok) {
		notes = await response.json()
	} else {
		console.log(response.status)
	}
	
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

	//вывод в консоль, 

	//for (note of notes) {
	//	console.log(note)
	//}
	notes.forEach(el => {

		let div0 = document.getElementById("notes")

		let divcont = document.createElement("div")
		divcont.classList.add("containerNotes")
		div0.appendChild(divcont)

		let dash = document.createElement("div")
		dash.innerText = "-------------"
		divcont.appendChild(dash)


		let id = document.createElement("div")
		id.innerText = el.id
		divcont.appendChild(id)

		let title = document.createElement("div")
		title.innerText = el.title
		divcont.appendChild(title)

		let message = document.createElement("div")
		message.innerText = el.message
		divcont.appendChild(message)


		let startDate = document.createElement("div")
		startDate.innerText = el.startDate
		divcont.appendChild(startDate)

		let myinfo = document.createElement("a")
		myinfo.innerText = "Info"
		//myinfo.addEventListener("click", getinfo)
		//myinfo.addEventListener("click", inform)
		myinfo.href = el.links[0].href
		divcont.appendChild(myinfo)


		let adelete = document.createElement("a")
		adelete.innerText = "Delete"
		adelete.addEventListener("click", deleteNote)
		//adelete.href = "/api/notes/" + el.id
		adelete.href = el.links[0].href
		//adelete.onclick = deleteNote
		//delnote

		divcont.appendChild(adelete)

		let aedit = document.createElement("a")
		aedit.innerText = "Edit"
		aedit.style.color = "#497DDD"
		aedit.addEventListener("click", updateNote)
		//myinfo.addEventListener("click", update)
		//aedit.addEventListener("click", updatEdSave)
		//let aeId = el.id
		//aedit.href = "/api/notes/" + aeId
		//let aid = aedit.href 
		//aedit.href = el.links[0].href
		//adelete.onclick = deleteNote
		//adelete.onclick = getinfo

		divcont.appendChild(aedit)

		let dash2 = document.createElement("div")
		dash2.innerText = "-------------"
		divcont.appendChild(dash2)

		document.querySelector("body").appendChild(div0)

	})

}

//отрисовка элементов без обращения на сервер
function elemShow(someArr) {

	//let div0 = document.getElementById("notes")
	let div0 = document.createElement("div")

	let divcont = document.createElement("div")
	divcont.classList.add("containerNotes")
	div0.appendChild(divcont)

	let dash = document.createElement("div")
	dash.innerText = "-------------"
	divcont.appendChild(dash)


	let id = document.createElement("div")
	id.innerText = someArr.id
	divcont.appendChild(id)

	let title = document.createElement("div")
	title.innerText = someArr.title
	divcont.appendChild(title)

	let message = document.createElement("div")
	message.innerText = someArr.message
	divcont.appendChild(message)


	let startDate = document.createElement("div")
	startDate.innerText = someArr.startDate
	divcont.appendChild(startDate)

	let myinfo = document.createElement("a")
	myinfo.innerText = "Info"
	//myinfo.addEventListener("click", noteInfo)
	myinfo.href = someArr.links[0].href
	//myinfo.href = "/api/notes/" + someArr.id
	divcont.appendChild(myinfo)


	let adelete = document.createElement("a")
	adelete.innerText = "Delete"
	adelete.addEventListener("click", deleteNote)
	//adelete.href = "/api/notes/" + someArr.id
	adelete.href = someArr.links[0].href
	//adelete.onclick = noteDelete
	divcont.appendChild(adelete)

	let aedit = document.createElement("a")
	aedit.innerText = "Edit"
	aedit.style.color = "#497DDD"
	aedit.addEventListener("click", updateNote)
	//aedit.addEventListener("click", noteEdit)
	//aedit.href = "/api/notes/" + someArr.id
	//aedit.href = someArr.links[0].href
	divcont.appendChild(aedit)

	let dash2 = document.createElement("div")
	dash2.innerText = "-------------"
	divcont.appendChild(dash2)

	document.querySelector("body").appendChild(div0)
}





async function submitFormSearch() {
	let form = document.getElementById("search_form")
	//дождаться проверки формы и отправить форму вручную
	if (await searchNotes()) {
		//отправлю форму
		form.submit()
	}

}


function reDrawButSave() {
	let title = document.getElementById("title").value
	let message = document.getElementById("message").value
	let btnsave = document.getElementById("butSave")

	if (saveNote()) {
		alert('Note was saved!')
	}
	document.getElementById("title").value = "";
	document.getElementById("message").value = "";

	arrNotes()
}

async function getinfo(event) {
	//if (confirm("Edit?")) {
	//let url ="/api/notes/" + id
		//let url = el.links[0].href
		let url = event.target.href
		let response = await fetch(url,
			{
				method: "GET",
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}
		)

		let rez = await response.json()
		for (r of rez) {
			console.log(r)
		}


		// return rez
	//}
	//console.log(rez)
	
	let div0 = document.getElementById("notes")
					if (div0){
						div0.remove()
						}
	
	rez.forEach(elem => {

		let div0 = document.getElementById("div")

		let dash = document.createElement("div")
		dash.innerText = "-------------"
		div0.appendChild(dash)


		let id = document.createElement("div")
		id.innerText = elem.id
		div0.appendChild(id)

		let title = document.createElement("div")
		title.innerText = elem.title
		div0.appendChild(title)

		let message = document.createElement("div")
		message.innerText = elem.message
		div0.appendChild(message)
document.querySelector("body").appendChild(div0)
	
	})
	
	//return rez
}

async function noteInfo(event) {
	if (confirm('Data of note will not be allowed to edit. Continue?')) {

		let url = event.target.href;
		let response = await fetch(url,
			{
				method: "GET",
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
			});
		let rez = await response.json();
		console.log(rez)
		//		for (r of rez){
		//			let div0 = document.getElementById("notes")
		//			if (div0)
		//				div0.remove()
		//			elemShow(r)
		//return r
		//		}
		return rez
	}
	arrNotes()
}

async function deleteNote(event) {
	if (confirm('Delete note?')) {
		let url = event.target.href
		let response = await fetch(url,
			{
				method: "DELETE"
			})
	}
}




//function noteEdit() {
//	alert('Data of note allowed to edit!')
//   let title = document.getElementById("title").value
//	let message = document.getElementById("message").value
//	let note = { title: title, message: message }
//
//	let url = "/api/notes"
//	let response = await fetch(url,
//		{
//			method: "PUT",
//			headers: {
//				'Content-Type': 'application/json;charset=utf-8'
//			},
//			body: JSON.stringify(note)
//		})
//
//	let reslt = await response.json()
//
//	return reslt
//}



async function update(event) {
	let idup = document.getElementById("upId").value
	let titleup = document.getElementById("upTitleCrt").value
	let messageup = document.getElementById("upMessageCrt").value


	let note = { id: idup, title: titleup, message: messageup }

//let url = event.target.href
	let url = "/api/notes/"+idup;  
	let response = await fetch(url, 
	{
		method: "PUT",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify( note )
	})
	//.then((response)=>{
	//	response.json()
	//	.then((response)=>console.log(response))
	//	})

	let reslt = await response.json()

	return reslt

}

function updateNote() {
	let div0 = document.getElementById("notes")
	if (div0) {
		div0.remove()
	}

	let h3note = document.createElement("h3")
	h3note.innerText = "Form for updating the note:"

	h3note.classList.add("hh")
	document.querySelector("body").appendChild(h3note)

	let divnote = document.createElement("div")

	let idCrt = document.createElement("input")
	idCrt.type = ""
	idCrt.placeholder = "Id"
	idCrt.id = "upId"
	idCrt.classList.add("inPut")
	divnote.appendChild(idCrt)

	let p2Crt = document.createElement("p")
	p2Crt.innerText = ""
	divnote.appendChild(p2Crt)

	let titleCrt = document.createElement("input")
	titleCrt.type = ""
	titleCrt.placeholder = "Title"
	titleCrt.id = "upTitleCrt"
	titleCrt.classList.add("inPut")
	divnote.appendChild(titleCrt)

	let pCrt = document.createElement("p")
	pCrt.innerText = ""
	divnote.appendChild(pCrt)

	let messageCrt = document.createElement("textarea")
	messageCrt.type = ""
	messageCrt.placeholder = "Message"
	messageCrt.id = "upMessageCrt"
	messageCrt.classList.add("inPut")
	divnote.appendChild(messageCrt)

	let p3Crt = document.createElement("p")
	p3Crt.innerText = ""
	divnote.appendChild(p3Crt)

	let buttonCrt = document.createElement("button")
	buttonCrt.type = "button"
	buttonCrt.value = "Update note"
	buttonCrt.innerText = "Update note"
	buttonCrt.classList.add("apply-button")
	buttonCrt.addEventListener("click", update)
	buttonCrt.addEventListener("click", function(){
		//(alert("Note was changed.\n Click the menu button: Notes\n or update it again"))
		(alert("Note was changed.\n Click the menu button: Notes"))
		h3note.remove()
		
		
		divnote.remove()
		//arrNotes()
	})
	
	
	divnote.appendChild(buttonCrt)

	document.querySelector("body").appendChild(divnote)
	
	
	
}

function updatEdSave() {
	//alert("Click the menu button: Notes")
	
		//alert("Note was changed")
		document.getElementById("upIdCrt").value = "";
		document.getElementById("upTitleCrt").value = "";
		document.getElementById("upMessageCrt").value = "";
		//if(confirm("Back to array of notes?")){
			//arrNotes()
				//let divnote = document.createElement("div")
			//let div0 = document.getElementById("notes")
	//if (divnote) {
	//	divnote.remove()
	//}
	//		alert("Click the menu button: Notes")
		//}
	//arrNotes()
}


function showFormUpdate() {

}

//arrNotes()
