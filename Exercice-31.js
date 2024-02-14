function miseEnPlace(){
    const corps=document.querySelector('body')
    const paragraphe=document.createElement("ul")
    const tilde_1 = document.createElement("li")
    const texte_1=document.createTextNode("one")
    const tilde_2 = document.createElement("li")
    const texte_2=document.createTextNode("two")
    const tilde_3 = document.createElement("li")
    const texte_3=document.createTextNode("three")
    tilde_1.appendChild(texte_1)
    tilde_2.appendChild(texte_2)
    tilde_3.appendChild(texte_3)
    paragraphe.appendChild(tilde_1)
    paragraphe.appendChild(tilde_2)
    paragraphe.appendChild(tilde_3)
    corps.appendChild(paragraphe)
    tilde_3.className="last"

  }
  // La fonction miseEnPlace ne sera appelée qu'une fois la page entièrement chargée
  window.addEventListener("load",miseEnPlace,false)
