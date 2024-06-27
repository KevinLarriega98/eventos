import { useState, useEffect } from 'react';
import { useUserContext } from "../app/Provider";
import { getItemById, updateItem, uploadProfilePhoto, setUserResidence } from "../app/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [usuario] = useUserContext();
    const [userData, setUserData] = useState({ name: '', surname: '', age: '', interests: '' });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [residence, setResidence] = useState('');
    const navigate = useNavigate();


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

    const handlePhotoChange = (e) => {
        if (e.target.files[0]) {
            setProfilePhoto(e.target.files[0]);
        }
    };

    const handleResidenceChange = (e) => {
        setResidence(e.target.value);
    };

    const handleSaveProfile = async () => {
        try {
            let updatedData = { ...userData };
            if (profilePhoto) {
                const photoURL = await uploadProfilePhoto(usuario.uid, profilePhoto);
                updatedData.photoURL = photoURL;
            }
            if (residence) {
                await setUserResidence(usuario.uid, residence);
            }

            await updateItem(usuario.uid, updatedData);


            navigate('/');
        } catch (error) {
            console.error("Error saving profile: ", error);
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <h3>User Profile</h3>
            <input type="text" placeholder="Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
            <input type="text" placeholder="Surname" value={userData.surname} onChange={(e) => setUserData({ ...userData, surname: e.target.value })} />
            <input type="number" placeholder="Age" value={userData.age} onChange={(e) => setUserData({ ...userData, age: e.target.value })} />
            <textarea placeholder="Interests" value={userData.interests} onChange={(e) => setUserData({ ...userData, interests: e.target.value })}></textarea>
            <button onClick={handleUpdate}>Update Profile</button>

            <h3>Profile Photo and Residence</h3>
            <input type="file" onChange={handlePhotoChange} />
            <input type="text" placeholder="Residence" value={residence} onChange={handleResidenceChange} />
            <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
    );
};

export default Profile;
