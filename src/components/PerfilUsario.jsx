import React, { useState } from 'react';
import { useUserContext } from "../app/Provider";
import { uploadProfilePhoto, setUserResidence } from "../app/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [residence, setResidence] = useState('');
    const [, setUsuario] = useUserContext();
    const navigate = useNavigate();

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
            if (profilePhoto) {
                const photoURL = await uploadProfilePhoto(auth.currentUser.uid, profilePhoto);
                // Optionally update user profile with photoURL
            }
            if (residence) {
                await setUserResidence(auth.currentUser.uid, residence);
            }
            // Optionally update other user details as needed

            // Example: Refresh user data in context
            // setUsuario(newUserData);

            navigate('/'); // Navigate to home or profile page after saving
        } catch (error) {
            console.error("Error saving profile: ", error);
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <input type="file" onChange={handlePhotoChange} />
            <input type="text" placeholder="Residence" value={residence} onChange={handleResidenceChange} />
            <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
    );
};

export default Profile;
