arrNotes()
/////добавить заметку
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

function reDrawButSave() {
	let title = document.getElementById("title").value
	let message = document.getElementById("message").value
	let btnsave = document.getElementById("butSave")
	//btnsave.addEventListener("click", function(){
	//this.previousElementSibling.value = "";
	//	title.value = "";
	//}) 
	//btnsave.addEventListener("click", saveNote())
	//btnsave.addEventListener("click", function(e){
	//	e.preventDefault();
	//	e.stopPropagation();
	//	document.getElementById("title").value = "";
	////	document.getElementById("message").value = "";
	//})
	if (saveNote()) {
		alert('Note was saved!')
	}
	document.getElementById("title").value = "";
	document.getElementById("message").value = "";

	arrNotes()
}
function titleClear() {
	let btnsave = document.getElementById("butSave")
	//let title = document.getElementById("title").value
	//btnsave.addEventListener("click", function(){
	//this.previousElementSibling.value = "";
	//	title.value = "";
	//}) 
	document.getElementById("butSave").onclick = function(e) {
		e.preventDefault();
		e.stopPropagation();
		document.getElementById("title").value = "";
		document.getElementById("message").value = "";
	}
}
function butClear() {
	$('#butSave').on('click', function(e) {
		e.preventDefault();
		var val = $("#title").val();
		if (val.length >= 1) {
			$('#title').val('');
		}
	});
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



//async function noteInfo(){
//	if (confirm('Data of note will not be allowed to edit. Continue?')){
//		//let url = event.target.href;
//		let url = el.links[0].href
//		let response = await fetch(url,
//			{
//				method: "GET"
//			});
//		let rez = await response.json();
//console.log(rez)
//		for (r of rez){
//			let div0 = document.getElementById("notes")
//			if (div0)
//				div0.remove()
//			elemShow(r)
//			//return r
//		}
//	return true
//	}
//	arrNotes()
//}


//async function noteDelete() {
//	if (confirm("Delete?")) {
//		let url = el.links[0].href
//		let response = await fetch(url,
//			{
//				method: "DELETE"
//			})
//	}
//}



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

///отрисовка списка заметок
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
		//myinfo.href = el.links[0].href
		//myinfo.addEventListener("click", noteInfo)
		myinfo.href = "/api/notes/" + el.id

		divcont.appendChild(myinfo)


		let adelete = document.createElement("a")
		adelete.innerText = "Delete"
		//adelete.addEventListener("click", deleteNote(event))
		adelete.href = el.links[0].href
		//adelete.href = "/api/notes/" + el.id
		//adelete.onclick = delnote
		adelete.onclick = deleteNote
		//adelete.onclick = async function() {
		//	if (confirm("Delete?")) {
		//		let url = el.links[0].href
		//		let response = await fetch(url,
		//			{
		//				method: "DELETE"
		//			})
		//	}
		//}

		divcont.appendChild(adelete)

		let aedit = document.createElement("a")
		aedit.innerText = "Edit"
		//aedit.addEventListener("click", noteEdit)
		//aedit.href = "/api/notes/" + el.id
		aedit.href = el.links[0].href
		divcont.appendChild(aedit)

		let dash2 = document.createElement("div")
		dash2.innerText = "-------------"
		divcont.appendChild(dash2)

		/////green line
		//let linedash = document.createElement("div")
		//linedash.style.borderBottomColor = "green"
		//linedash.style.borderBottomStyle = "dashed"
		//div0.appendChild(linedash)

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
	myinfo.href = el.links[0].href
	//myinfo.href = "/api/notes/" + someArr.id
	divcont.appendChild(myinfo)


	let adelete = document.createElement("a")
	adelete.innerText = "Delete"
	//adelete.addEventListener("click", deleteNote(event))
	//adelete.href = "/api/notes/" + someArr.id
	adelete.href = someArr.links[0].href
	adelete.onclick = noteDelete
	divcont.appendChild(adelete)

	let aedit = document.createElement("a")
	aedit.innerText = "Edit"
	aedit.addEventListener("click", noteEdit)
	//aedit.href = "/api/notes/" + someArr.id
	aedit.href = someArr.links[0].href
	divcont.appendChild(aedit)

	let dash2 = document.createElement("div")
	dash2.innerText = "-------------"
	divcont.appendChild(dash2)

	document.querySelector("body").appendChild(div0)
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
	////поиск соответствия вводимого названия существующему названию заметки в БД 
	//for (note of notes) {
	//if (note.title == word) {
	//let div0 = document.getElementById("notes")
	//if(div0)
	//div0.remove()		
	//	elemShow(note)
	//	
	//	console.log(note)
	//	n++
	//}
	//else if (note.message == word) {
	//let div0 = document.getElementById("notes")
	//if(div0)
	//div0.remove()		
	//	elemShow(note)
	//	//alert("Note.message exist")
	//	console.log(note)
	//	n++
	//}
	//}
	///////////////////////
	for (note of notes) {
		if (((note.title).toLowerCase()).includes(word)) {
			let div0 = document.getElementById("notes")
			if (div0)
				div0.remove()
			elemShow(note)

			console.log(note)
			n++
		}
		else if (((note.message).toLowerCase()).includes(word)) {
			let div0 = document.getElementById("notes")
			if (div0)
				div0.remove()
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

async function submitFormSearch() {
	let form = document.getElementById("search_form")
	//дождаться проверки формы и отправить форму вручную
	if (await searchNotes()) {
		//отправлю форму
		form.submit()
	}

}
//searchNotes()
//arrNotes()