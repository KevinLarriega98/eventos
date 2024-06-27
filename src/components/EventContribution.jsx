import { useEffect, useState } from 'react';
import { getItems, updateItem } from "../app/api";

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
            <h2>What will you bring?</h2>
            <select onChange={(e) => setSelectedEvent(e.target.value)}>
                <option value="">Select Event</option>
                {events.map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                ))}
            </select>
            <input type="text" placeholder="What will you bring?" value={contribution} onChange={(e) => setContribution(e.target.value)} />
            <button onClick={handleContribution}>Add Contribution</button>
        </div>
    );
};

export default EventContribution;

