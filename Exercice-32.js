/* eslint-disable no-unused-vars */

function miseEnPlace() {
    const corps = document.querySelector('body')
    document.getElementById("b1").addEventListener("click", yellow, false)
    document.getElementById("b2").addEventListener("click", change, false)
    document.getElementById("b3").addEventListener("click", transform, false)
}

// La fonction miseEnPlace ne sera appelée qu'une fois la page entièrement chargée
window.addEventListener("load", miseEnPlace, false)

function yellow(event) {
    // this est l'élément auquel on aura attaché l'évènement
    const contents = document.getElementById("contents");
    contents.style.backgroundColor = 'yellow'
}

function change(event) {
    const title = document.querySelector("h1")

    if (title.style.color === 'red') {
        title.style.color = "#66f"
    } else {
        title.style.color = 'red'
    }
}

function transform(event) {
    let paragraph = document.querySelectorAll("p")
    
    for (var p of paragraph.values()) {
        if (p.style.fontStyle !== 'italic') {
            p.style.fontStyle = 'italic'
            return
        }
    }
}
