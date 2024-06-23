import React, { useState, useEffect } from 'react';
import { db, auth, doc, updateDoc, getDoc } from '../firebase';
import { useUserContext } from '../context/Provider';

const PerfilUsuario = () => {
    const [usuario] = useUserContext();
    const [userData, setUserData] = useState({
        nombre: '',
        apellidos: '',
        edad: '',
        intereses: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (usuario) {
                const userDoc = await getDoc(doc(db, 'usuarios', usuario.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        };
        fetchUserData();
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usuario) {
            await updateDoc(doc(db, 'usuarios', usuario.uid), userData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} placeholder="Nombre" />
            <input type="text" name="apellidos" value={userData.apellidos} onChange={handleChange} placeholder="Apellidos" />
            <input type="number" name="edad" value={userData.edad} onChange={handleChange} placeholder="Edad" />
            <textarea name="intereses" value={userData.intereses} onChange={handleChange} placeholder="Intereses"></textarea>
            <button type="submit">Actualizar</button>
        </form>
    );
};

export default PerfilUsuario;
