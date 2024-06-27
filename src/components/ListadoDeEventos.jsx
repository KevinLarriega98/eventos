import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getItems, getUsersByUserId } from "../app/api"
import { useUserContext } from "../app/Provider"
import '../css/styles.css'


import styled from 'styled-components';

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;


const Button = styled.button`
    padding: 10px 20px;
    margin: 10px 0;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;




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
            <Container>
                <Link to={"/perfilusario"}> <Button>Perfil</Button></Link>
                <Title><h1>Listado de eventos</h1></Title>
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

                <Link to={"/nuevoevento"}><Button>+</Button></Link><br></br>
                <Link to={"/register"}><Button>Register</Button></Link><br></br>
                <Link to={"/eventcontribution"}><Button>Que voy llevar</Button></Link>
            </Container>
        </>
    )
}

export default ListadoDeEventos
