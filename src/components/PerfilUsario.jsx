import { useState, useEffect } from 'react';
import { useUserContext } from "../app/Provider";
import { getItemById, updateItem, uploadProfilePhoto, setUserResidence } from "../app/api";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from "react-router-dom"

const ProfileContainer = styled.div`
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

const SectionTitle = styled.h3`
    margin-top: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    margin: 10px ;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;


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

        <ProfileContainer>
            <Title>Profile</Title>
            <SectionTitle>User Profile</SectionTitle>
            <Input type="text" placeholder="Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
            <Input type="text" placeholder="Surname" value={userData.surname} onChange={(e) => setUserData({ ...userData, surname: e.target.value })} />
            <Input type="number" placeholder="Age" value={userData.age} onChange={(e) => setUserData({ ...userData, age: e.target.value })} />
            <TextArea placeholder="Interests" value={userData.interests} onChange={(e) => setUserData({ ...userData, interests: e.target.value })}></TextArea>
            <Button onClick={handleUpdate}>Update Profile</Button>

            <SectionTitle>Profile Photo and Residence</SectionTitle>
            <Input type="file" onChange={handlePhotoChange} />
            <Input type="text" placeholder="Residence" value={residence} onChange={handleResidenceChange} />
            <Button onClick={handleSaveProfile}>Save Profile</Button> <br></br>
            <Link to="/ListadoDeEventos"><Button>Home</Button></Link>
        </ProfileContainer>

    );
};

export default Profile;
