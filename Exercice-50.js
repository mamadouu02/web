/* Base URL of the web-service for the current user and access token */
const backend = "https://cawrest.ensimag.fr" // replace by the backend to use
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYm91ZGFobWEifQ.pH_a-tdDJBuq9QHi_Eoq4ok70jk5Zsy-I4fhT6S2P7s" //replace by your token : go to BACKEND/getjwsDeleg/caw to obtain it
const wsBase = `${backend}/bmt/boudahma/` // replace USER by your login used to obtain TOKEN

/* Shows the identity of the current user */
function setIdentity() {
	//TODO 1
	fetch("https://cawrest.ensimag.fr/whoami", {method: "GET",
												headers: {"x-access-token": token}})
	.then(res=>res.json())
	.then(json=>{
		document.querySelector("h1").querySelector("span").textContent=json.data;
	})
	.catch(error=>{})
}

/* Sets the height of <div id="#contents"> to benefit from all the remaining place on the page */
function setContentHeight() {
	let availableHeight = window.innerHeight
	availableHeight -= document.getElementById("contents").offsetTop
	availableHeight -= 2 * document.querySelector('h1').offsetTop
	availableHeight -= 4 * 1
	document.getElementById("contents").style.height = availableHeight + "px"
}


/* Selects a new object type : either "bookmarks" or "tags" */
function selectObjectType(type) {
	// TODO
	const menu = document.getElementById("menu")
	console.log(menu.getElementsByClassName("tags")[0].classList.contains("selected"))
	if (menu.getElementsByClassName(type)[0].classList.contains("selected")){
		return
	}
	if (type == "bookmarks"){
		menu.getElementsByClassName("tags")[0].classList.remove("selected")
		menu.getElementsByClassName("bookmarks")[0].classList.add("selected")
		listBookmarks()

	}else if(type == "tags"){
		menu.getElementsByClassName("bookmarks")[0].classList.remove("selected")
		menu.getElementsByClassName("tags")[0].classList.add("selected")
		document.getElementById("add").querySelector("div").classList.add("selected")
		listTags()
	}

}

/* Loads the list of all bookmarks and displays them */
function listBookmarks() {
	console.log("listBookmarks called")
	//TODO

}

/* Loads the list of all tags and displays them */
function listTags() {
	console.log("listTags called")
	//TODO
	var div = document.getElementById("items")
	while(div.firstChild){
		div.removeChild(div.firstChild)
	}
	fetch("https://cawrest.ensimag.fr/bmt/boudahma/tags", {method: "GET",
												headers: {"x-access-token": token}})
	.then(res=>res.json())
	.then(json=>{
		const items = document.getElementById("items")
		for (let i=0;i<json.data.length;i++){
			const copie = document.getElementsByClassName("model tag")[0].cloneNode(true)
			copie.querySelector("h2").textContent = json.data[i].name
			copie.setAttribute("num",json.data[i].id)
			copie.classList.replace("model","item")
			items.appendChild(copie)
		}
	})
	.catch(error=>{})
}

/* Adds a new tag */
function addTag() {
	//TODO
	let input = document.querySelector('input[name= "name"').value
	if (!input){
		alert("Name must be filled out")
		return false
	}
	fetch("https://cawrest.ensimag.fr/bmt/boudahma/tags", {
		"method": "POST",
		"headers": {
			"Content-Type" : "application/x-www-form-urlencoded",
		  "x-access-token": token
		},
		"body":  "data=" + encodeURIComponent(JSON.stringify({ "name": input }))
	})							
	.then(res=>res.json())
	.then(json=>{
		listTags()
	})
	.catch(error=>{})

}

/* Handles the click on a tag */
function clickTag(tag) {
	//TODO
	if (document.getElementById("items").getElementsByClassName("selected")[0]==tag){
		return
	}
	
	if(document.getElementById("items").getElementsByClassName("selected")[0]!=null){

		const  parent = document.getElementById("items").getElementsByClassName("selected")[0]
		const name = parent.querySelector("input").value
		parent.classList.remove("selected")
		parent.removeChild(parent.children[0])
		parent.removeChild(parent.children[0])
		parent.removeChild(parent.children[0])
		const h = document.createElement("h2")
		h.textContent = name
		parent.appendChild(h)
		
		
	}
	tag.classList.add("selected")
	const nom = tag.querySelector("h2").textContent
	tag.querySelector("h2").remove(tag.firstChild)
	const input = document.createElement("input")
	input.setAttribute("type","text")
	input.setAttribute("value",nom)
	tag.appendChild(input)
	const modify = document.createElement("button")
	modify.textContent = "Modify name"
	modify.setAttribute("type","button")
	modify.setAttribute("id","modifyName")
	tag.appendChild(modify)

	const del = document.createElement("button")
	del.textContent = "Remove tag"
	del.setAttribute("type","button")
	del.setAttribute("id","removeTag")
	tag.appendChild(del)
	console.log(document.getElementById("modifyName"))
	document.getElementById("modifyName").addEventListener("click",modifyTag,false)
	document.getElementById("removeTag").addEventListener("click",removeTag,false)

}

/* Performs the modification of a tag */
function modifyTag() {
	//TODO 8
	let input = document.querySelector('input[type= "text"').value
	const tag = document.getElementById("items").getElementsByClassName("selected")[0]
	console.log("modify called")
	console.log(tag)
	fetch("https://cawrest.ensimag.fr/bmt/boudahma/tags/" + tag.getAttribute("num"), {
		"method": "PUT",
		"headers": {
			"Content-Type" : "application/x-www-form-urlencoded",
		  "x-access-token": token
		},
		"body":  "data=" + encodeURIComponent(JSON.stringify({ "name": input }))
	})							
	.then(res=>res.json())
	.then(json=>{
		listTags()
	})
	.catch(error=>{})

}

/* Removes a tag */
function removeTag() {
	//TODO 9
	console.log("remove called")
	let input = document.querySelector('input[type= "text"').value
	const tag = document.getElementById("items").getElementsByClassName("selected")[0]
	console.log(tag)
	fetch("https://cawrest.ensimag.fr/bmt/boudahma/tags/" + tag.getAttribute("num"), {
		"method": "DELETE",
		"headers": {
			"Content-Type" : "application/x-www-form-urlencoded",
		  "x-access-token": token
		},
	})							
	.then(res=>res.json())
	.then(json=>{
		listTags()
	})
	.catch(error=>{})
}
/* On document loading */
function miseEnPlace() {

	/* Give access token for future ajax requests */

	// Put the name of the current user into <h1>
	setIdentity()
	// Adapt the height of <div id="contents"> to the navigator window
	setContentHeight()
	window.addEventListener("resize",setContentHeight)
	// Listen to the clicks on menu items
	for (let element of document.querySelectorAll('#menu li')){
		element.addEventListener('click',function() {
			const isTags = this.classList.contains('tags')
			selectObjectType(isTags ? "tags" : "bookmarks")
		},false)
	}
	// Initialize the object type to "tags"
	selectObjectType("tags")
	// Listen to clicks on the "add tag" button

	document.getElementById("addTag").addEventListener("click",addTag,false)
	document.getElementById("items").addEventListener("click",(e)=>{
			// Listen to clicks on the tag items
			const tag = e.target.closest(".tag.item")
			if (tag !== null) {clickTag(tag);return}
			// Questions 10 & 12 - Listen to clicks on bookmark items
			const bookmark = e.target.closest(".bookmark.item")
			if (bookmark !== null) {clickBookmark(bookmark)}
		}
		,false)
		
}
window.addEventListener('load',miseEnPlace,false)
