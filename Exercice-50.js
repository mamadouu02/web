/* Base URL of the web-service for the current user and access token */
const backend = "https://cawrest.ensimag.fr" // replace by the backend to use
const token = "TOKEN" //replace by your token : go to BACKEND/getjwsDeleg/caw to obtain it
const wsBase = `${backend}/bmt/USER/` // replace USER by your login used to obtain TOKEN

/* Shows the identity of the current user */
function setIdentity() {
	//TODO 1
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
}

/* Adds a new tag */
function addTag() {
	//TODO
}

/* Handles the click on a tag */
function clickTag(tag) {
	//TODO
}

/* Performs the modification of a tag */
function modifyTag() {
	//TODO 8
}

/* Removes a tag */
function removeTag() {
	//TODO 9
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
