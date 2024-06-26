import { useEffect, useState } from "react"
import { createEvent, getItems } from "../app/api"
import { useUserContext } from "../app/Provider"

const NuevoEvento = () => {
    const [listaParticipantes, setListaParticipantes] = useState([])
    const [checkedUsersIds, setCheckedUsersIds] = useState([])
    const [nombre, setNombre] = useState([])
    const [fecha, setFecha] = useState([])
    const [usuario] = useUserContext()

    const onChange = (userId) => {
        if (checkedUsersIds.includes(userId)) {
            setCheckedUsersIds(checkedUsersIds.filter(id => userId != id))
        } else {
            setCheckedUsersIds([...checkedUsersIds, userId]);
        }
    }

    useEffect(() => {
        getItems('usersEventos').then(data => setListaParticipantes(data))
    }, [])

    return (
        <>
            <h1>Nuevo evento</h1>

            <label>Nombre del evento</label>
            <input type="text" onChange={(e) => setNombre(e.target.value)} /><br /><br />

            <label>Fecha del evento</label>
            <input type="date" onChange={(e) => setFecha(e.target.value)} /><br /><br />

            <label>Participantes</label>
            {listaParticipantes
                .filter(listaParticipante => listaParticipante.id !== usuario.uid)
                .map((listaParticipante, index) =>
                    <div key={index}>
                        <input type="checkbox" id={listaParticipante.id} onChange={() => onChange(listaParticipante.id)} />
                        <label htmlFor={listaParticipante.id}>{listaParticipante.name}</label>
                    </div>
                )
            }

            <br /><button onClick={async () => {
                if (checkedUsersIds.length > 0 && nombre !== "" && fecha !== undefined) {
                    await createEvent(usuario.uid, nombre, fecha, checkedUsersIds)
                } else {
                    alert("Ningún campo puede estar vacío.")
                }
            }}>Crear evento</button>
        </>
    )
}

export default NuevoEvento
