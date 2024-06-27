
import { useState, useEffect } from 'react';
import { useUserContext } from "../app/Provider";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../app/firebase";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { getItems, createEvent } from "../app/api";

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

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
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

const EventItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setUsuario] = useUserContext();
    const navigate = useNavigate();

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getItems('events');
            setEventos(data);
        } catch (error) {
            console.error("Error fetching events: ", error);
        }
    };


    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUsuario(userCredential.user);
            navigate('/perfilusuario');
        } catch (error) {
            console.error("Error registering: ", error);
        }
    };

    const handleRegisterForEvent = async (eventId) => {
        try {
            const userId = auth.currentUser.uid;
            const selectedEvent = eventos.find(event => event.id === eventId);
            if (selectedEvent) {
                await createEvent(userId, selectedEvent.msg, selectedEvent.date, [selectedEvent.remitenteId]);
                alert(`Registered successfully for event: ${selectedEvent.msg}`);
                fetchEvents();
            } else {
                console.error("Event not found.");
            }
        } catch (error) {
            console.error("Error registering for event: ", error);
        }
    };

    return (
        <div>
            <Container>
                <Title>Register</Title>
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleRegister}>Register</Button> <br></br>
                <Link to="/listadodeeventos"><Button>Home</Button></Link>

                <Title>List of Events</Title>
                {eventos.map(evento => (
                    <EventItem key={evento.id}>
                        <h3>{evento.msg}</h3>
                        <p>Date: {evento.date ? new Date(evento.date.seconds * 1000).toLocaleDateString() : 'Date not available'}</p>
                        <Button onClick={() => handleRegisterForEvent(evento.id)}>Register for Event</Button>
                    </EventItem>
                ))}
            </Container>

        </div>
    );
};

export default Register;
