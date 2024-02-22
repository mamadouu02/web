function miseEnPlace() {
    const corps = document.querySelector('body')
    const paragraphe = document.createElement("ul")
    const tilde1 = document.createElement("li")
    const texte1 = document.createTextNode("one")
    const tilde2 = document.createElement("li")
    const texte2 = document.createTextNode("two")
    const tilde3 = document.createElement("li")
    const texte3 = document.createTextNode("three")
    tilde1.appendChild(texte1)
    tilde2.appendChild(texte2)
    tilde3.appendChild(texte3)
    paragraphe.appendChild(tilde1)
    paragraphe.appendChild(tilde2)
    paragraphe.appendChild(tilde3)
    corps.appendChild(paragraphe)
    tilde3.className = "last"
}

// La fonction miseEnPlace ne sera appelée qu'une fois la page entièrement chargée
window.addEventListener("load", miseEnPlace, false)
