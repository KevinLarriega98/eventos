import React, { useState, useEffect } from 'react';
import { useUserContext } from "../app/Provider";
import { getItemById, updateItem } from "../app/api";

const Profile = () => {
    const [usuario, setUsuario] = useUserContext();
    const [userData, setUserData] = useState({ name: '', surname: '', age: '', interests: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            if (usuario) {
                const data = await getItemById(usuario.uid);
                setUserData(data);
            }
        };

        fetchUserData();
    }, [usuario]);

    const handleUpdate = async () => {
        try {
            await updateItem(usuario.uid, userData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile: ", error);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <input type="text" placeholder="Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
            <input type="text" placeholder="Surname" value={userData.surname} onChange={(e) => setUserData({ ...userData, surname: e.target.value })} />
            <input type="number" placeholder="Age" value={userData.age} onChange={(e) => setUserData({ ...userData, age: e.target.value })} />
            <textarea placeholder="Interests" value={userData.interests} onChange={(e) => setUserData({ ...userData, interests: e.target.value })}></textarea>
            <button onClick={handleUpdate}>Update Profile</button>
        </div>
    );
};

export default Profile;
