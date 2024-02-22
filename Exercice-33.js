/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function miseEnPlace() {
    const corps = document.querySelector('body')
    document.getElementById("showMenu").addEventListener("click", switchMenu, false)
    document.getElementById("ltheme").addEventListener("change", switchTheme, false)
}

// La fonction miseEnPlace ne sera appelée qu'une fois la page entièrement chargée
window.addEventListener("load", miseEnPlace, false)

function switchMenu(event) {
    const menu = document.getElementById("menu");

    if (menu.style.display !== 'none') {
        menu.style.display = 'none'
    } else {
        menu.style.display = 'contents'
    }
}