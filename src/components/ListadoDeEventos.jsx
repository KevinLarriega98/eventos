import { Link } from "react-router-dom"

const ListadoDeEventos = () => {
    return (
        <>

            <Link to={"/perfilusario"}><button>Perfil</button></Link>
            <h1>Listado de eventos</h1>
            <Link to={"/nuevoevento"}>+</Link>
            <h1>Registrate</h1>
            <Link to={"/register"}><button>registrarse</button></Link>
            <h1>Que voy a llevar</h1>
            <Link to={"/eventcontribution"}><button>Que voy a llevar</button></Link>

        </>
    )
}

export default ListadoDeEventos