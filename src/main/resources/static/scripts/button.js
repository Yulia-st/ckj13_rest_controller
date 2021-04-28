function btnClick(event){
	//alert("Button clicked")
	let el = event.target
	el.classList.toggle("active")
	el.classList.toggle("disabled")
	if(el.classList.contains("active")){
		el.innerText = "Click me"
	}else{
		el.innerText = "Disabled"
	}
}
function drawButton(){
	let button = document.createElement("div")
	//button.style.background="green"
	//button.style.width="60px"
	//button.style.height="30px"
	//button.style.color="white"
	button.classList.add("btn1")
	button.classList.add("active")
	button.innerText="Click me"
	
	//1
	//button.onclick = function(){
	//	alert("Button clicked")
	//}
	
	//2
	//button.onclick = btnClick
	
	//3
	button.addEventListener("click", btnClick)
	document.querySelector("body").appendChild(button)
}
drawButton()


//let div0 = document.getElementById("notes")
//let div0 = document.createElement("div")
//		let id = document.createElement("div")
//		//div0.classList.add("containerNotes")
//		id.innerText = el.id
//		div0.appendChild(id)
//		document.querySelector("body").appendChild(div0)
		
//		let div = document.createElement("div")
//		let title = document.createElement("div")
//		title.innerText = el.title
//		div.appendChild(title)
//		document.querySelector("body").appendChild(div)
		
//		let div2 = document.createElement("div")
///		let message = document.createElement("div")
//		message.innerText = el.message
//		div2.appendChild(message)
//		document.querySelector("body").appendChild(div2)
		
//		let div3 = document.createElement("div")
//		let startDate = document.createElement("div")
//		startDate.innerText = el.startDate
//		div3.appendChild(startDate)
//		document.querySelector("body").appendChild(div3)
		
//		let div4 = document.createElement("div")
//		let ainfo = document.createElement("a")
//		ainfo.innerText = "Info"
//		ainfo.addEventListener("click", btnClick)
		//ainfo.href = el.startDate
//		div4.appendChild(ainfo)
//		document.querySelector("body").appendChild(div4)
		
//		let linedash = document.createElement("div")
//		linedash.style.borderBottomColor="green"
//		linedash.style.borderBottomStyle="dashed"
//		document.querySelector("body").appendChild(linedash)
		