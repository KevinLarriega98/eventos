import { Link } from "react-router-dom"

const ListadoDeEventos = () => {
    return (
        <>
            <button>Perfil</button>
            <h1>Listado de eventos</h1>
            <Link to={"/nuevoevento"}>+</Link>
        </>
    )
}

export default ListadoDeEventos