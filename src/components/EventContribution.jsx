import { useEffect, useState } from 'react';
import { getItems, updateItem } from "../app/api";
import { Link } from "react-router-dom"
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
const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
   
`;




const EventContribution = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [contribution, setContribution] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getItems();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    const handleContribution = async () => {
        if (selectedEvent && contribution) {
            await updateItem(selectedEvent, { contribution });
            alert("Contribution added successfully!");
        } else {
            alert("Please select an event and provide your contribution.");
        }
    };

    return (
        <div>
            <Container>
                <Title><h2>What will you bring?</h2></Title>
                <select onChange={(e) => setSelectedEvent(e.target.value)}>
                    <option value="">Select Event</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>{event.name}</option>
                    ))}
                </select>
                <Input type="text" placeholder="What will you bring?" value={contribution} onChange={(e) => setContribution(e.target.value)} />
                <Button onClick={handleContribution}>Add Contribution</Button> <br />
                <Link to="/listadodeeventos"><Button>Home</Button></Link>
            </Container>
        </div>

    );
};

export default EventContribution;


