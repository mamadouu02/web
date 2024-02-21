function lifo_push(event) {
    const item = document.getElementById("newItem")

    if (item.value) {
        const text = document.createTextNode(item.value)
        const li = document.createElement("li")
        li.appendChild(text)
        document.getElementById("lifo").prepend(li)
        item.value = ""
    } else {
        alert("Le texte saisi est vide.")
    }
}

function lifo_pop(event) {
    const lifo = document.getElementById("lifo")
    const li = lifo.querySelector("li:first-child")

    if (li) {
        lifo.removeChild(li)
    } else {
        alert("Il n'y a aucun item dans la liste #lifo.")
    }
}

function lifo_peek(event) {
    const li = document.getElementById("lifo").querySelector("li:first-child")

    if (li) {
        document.getElementById("peek-area").textContent = li.textContent
    } else {
        alert("Il n'y a aucun item dans la liste #lifo.")
    }
}

function pressEnter(event) {
    if (event.key == 'Enter') {
        event.preventDefault()
    }
}

function handle() {
    document.querySelector('input[name="push"]').addEventListener("click", lifo_push)
    document.querySelector('input[name="pop"]').addEventListener("click", lifo_pop)
    document.querySelector('input[name="peek"]').addEventListener("click", lifo_peek)
    document.getElementById("newItem").addEventListener("keypress", pressEnter)
}

window.addEventListener("load", handle)