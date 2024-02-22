/* global getDefinition */
/* eslint-disable no-unused-vars */

function miseEnPlace() {
    console.log("debut")
    // let O = { 'title': 'Example', 'items': ['one','two'] }
    const commands = document.getElementById("commands")
    let count = 0

    for (var p of commands.querySelectorAll('li').values()) {
        count++
        p.addEventListener("click", liste)
    }
}

// La fonction miseEnPlace ne sera appelée qu'une fois la page entièrement chargée
window.addEventListener("load", miseEnPlace, false)

class title {
    chaine

    constructor(chaine) { // Seul constructeur
        this.chaine = chaine
    }
}

class items {
    #tab

    constructor(tab) { // Seul constructeur
        this.#tab = tab
    }
}

class ListeDefinition {
    title; // Attribut privé
    items

    constructor(title, items) { // Seul constructeur
        this.title = title;
        this.items = items;
    }
}

function print(a) {
    const corps = document.getElementById('contents')
    const paragraphe = document.createElement("p")
    const texteTitle = document.createTextNode(a)
    paragraphe.appendChild(texteTitle)
    corps.appendChild(paragraphe)
}

function titre(defI) {
    if (!(defI instanceof Object)) {
        return false
    }

    const paragraphe = document.createElement("dl")
    const title = document.createElement("dt")
    const texteTitle = document.createTextNode(defI.title)

    title.appendChild(texteTitle)
    paragraphe.appendChild(title)
    const items = document.createElement('dd')
    const liste = document.createElement('ul')
    const item = document.createElement('li')

    for (let i = 0; i < defI.items.length; i++) {
        const item = document.createElement('li')
        const par = titre(defI.items[i])

        if (par == false) {
            const texteItem = document.createTextNode(defI.items[i])
            item.appendChild(texteItem)
        } else {
            item.appendChild(par)
        }

        liste.appendChild(item)
    }

    items.appendChild(liste)
    paragraphe.appendChild(items)
    return paragraphe
}

function liste(i) {
    i = parseInt(this.firstChild.value)
    let defI = getDefinition(i)
    const corps = document.getElementById('contents')
    const paragraphe = document.createElement("dl")
    const title = document.createElement("dt")
    const texteTitle = document.createTextNode(defI.title)

    title.appendChild(texteTitle)
    paragraphe.appendChild(title)
    const items = document.createElement('dd')
    const liste = document.createElement('ul')
    const item = document.createElement('li')

    for (let i = 0; i < defI.items.length; i++) {
        const item = document.createElement('li')
        const par = titre(defI.items[i])

        if (par == false) {
            const texteItem = document.createTextNode(defI.items[i])
            item.appendChild(texteItem)
        } else {
            item.appendChild(par)
        }
        liste.appendChild(item)
    }

    items.appendChild(liste)
    paragraphe.appendChild(items)
    corps.appendChild(paragraphe)
}