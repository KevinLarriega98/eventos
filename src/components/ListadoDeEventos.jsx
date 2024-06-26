import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getItems, getUsersByUserId } from "../app/api"
import { useUserContext } from "../app/Provider"
import '../css/styles.css'

const ListadoDeEventos = () => {
    const [eventos, setEventos] = useState([])
    const [usuario] = useUserContext()

    useEffect(() => {
        getItems('events').then(data => {
            const filteredEvents = data.filter(event => event.destinatarioId === usuario.uid);

            const arrayIds = []
            filteredEvents.map(events => arrayIds.push(events.remitenteId))
            const filteredArrayIds = arrayIds.filter((arrayId, index) => arrayIds.indexOf(arrayId) === index)

            getUsersByUserId(filteredArrayIds).then(data2 => {
                const matchingThreadTexts = data.map(d => {
                    const remitente = data2.find(d2 => d2.id === d.remitenteId);

                    return remitente && d.destinatarioId === usuario.uid ? {
                        msg: d.msg,
                        userName: remitente.name,
                        messageId: d.id,
                        destinatarioId: d.destinatarioId
                    } : null;
                }).filter(o => o != null)

                setEventos(matchingThreadTexts)
            })

        })
    }, [])

    return (
        <>
            <button>Perfil</button>
            <h1>Listado de eventos</h1>

            {eventos &&
                <div className="container">
                    {eventos.map((evento, index) => {
                        return (
                            <div key={index} className="events">
                                <h1>{evento.msg}</h1>
                                <h3>Organizado por: {evento.userName}</h3>
                            </div>
                        );
                    })}
                </div>
            }

            <Link to={"/nuevoevento"}>+</Link>
        </>
    )
}

export default ListadoDeEventos