import { useContext } from 'react'
import { AppContext } from '../AppContext'

function Accueil() {
    const { name } = useContext(AppContext)

    return (
        <div>Bonjour, {name}</div>
    )
}

export default Accueil